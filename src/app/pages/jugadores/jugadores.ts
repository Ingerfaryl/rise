import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { Select } from 'primeng/select';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { Toast } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';

import { AlianzaService } from '../alianza/services/alianzaservice';
import { JugadoresService } from './services/jugadores';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-jugadores',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    AutoCompleteModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    Select,
    TooltipModule,
    ToolbarModule,
    TableModule,
    Toast,
    DialogModule,
    ConfirmDialogModule,
    InputNumberModule
  ],
  providers: [MessageService,ConfirmationService],
  templateUrl: './jugadores.html',
  styleUrls: ['./jugadores.css']
})

export class Jugadores implements OnInit {
  alianzas: any[] = []; 
  filteredAlianzas: any[] = [];
  selectedAlianza: any = null;  
  selectedAlianzaEdit: any = null;  
  filtro: any;
  jugadores: any[] = [];

  // Variables para el modal de edición
  mostrarModalEditar: boolean = false;
  jugadorSeleccionado: any = null;
  jugadorOriginal: any = null; // Para guardar copia del original

  // Campos del formulario
  jugadorNombre: string = '';
  jugadorId: number | null = null;
  jugadorPoder: number | null = null;
  jugadorKp: number | null = null;

  constructor(
    private alianzaService: AlianzaService,
    private jugadoresService: JugadoresService,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.cargarAlianzas();
    this.listarJugadores();
  }

  abrirModalEditar(jugador: any) {
    // Guardamos una copia del jugador original por si cancela
    this.jugadorOriginal = { ...jugador };
    // Clonamos el jugador para editarlo
    this.jugadorSeleccionado = { ...jugador };
    // Inicializar la selección de alianza para el modal sin afectar el formulario de registro
    this.selectedAlianzaEdit = jugador.id_alianza ?? jugador.id_Alianza ?? jugador.idAlianza ?? null;
    this.mostrarModalEditar = true;
  }

  guardarCambios() {
    // Validación básica
    if (!this.jugadorSeleccionado.nombre_juego?.trim()) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'El nombre del jugador es obligatorio'
      });
      return;
    }

    if (this.jugadorSeleccionado.poder == null || this.jugadorSeleccionado.kp_inicial == null) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Poder y KP son obligatorios',
      });
      return;
    }
    const parametros = {
      opcion: 'U', // 'U' para Update
      idJugador: this.jugadorSeleccionado.id_jugador_rok, // Usar el ID del jugador seleccionado
      nombreJugador: this.jugadorSeleccionado.nombre_juego, 
      poder: this.jugadorSeleccionado.poder,
      kp: this.jugadorSeleccionado.kp_inicial,
      idAlianza: this.selectedAlianzaEdit?.value ?? this.selectedAlianzaEdit
    };
    console.log('Parámetros para actualizar jugador:', parametros);
    // Aquí llamarías a tu servicio para actualizar en el backend
    this.jugadoresService.Jugadores(parametros).subscribe({
      next: () => {
        console.log(parametros);
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Jugador actualizado correctamente',
        });
        this.cerrarModalEditar();
        this.listarJugadores(); 
      },
      error: (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo actualizar el jugador'
        });
      }
    });
  }

  // Confirmar eliminación
  confirmarEliminar(jugador: any) {
    this.confirmationService.confirm({
      message: `¿Está seguro de eliminar al jugador <strong>${jugador.nombre_juego}</strong>?`,
      header: 'Confirmar Eliminación',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'Sí, eliminar',
      rejectLabel: 'Cancelar',
      acceptButtonStyleClass: 'p-button-danger',
      accept: () => {
        this.eliminarJugador(jugador);
      }
    });
  }

  // Eliminar jugador
  eliminarJugador(jugador: any) {
    // Aquí llamarías a tu servicio para eliminar en el backend
    // this.jugadoresService.eliminarJugador(jugador.id).subscribe({
    //   next: () => {
    //     // Eliminar de la lista local
    //     this.jugadores = this.jugadores.filter(j => j.id !== jugador.id);
    //     
    //     this.messageService.add({
    //       severity: 'success',
    //       summary: 'Éxito',
    //       detail: 'Jugador eliminado correctamente'
    //     });
    //   },
    //   error: (error) => {
    //     this.messageService.add({
    //       severity: 'error',
    //       summary: 'Error',
    //       detail: 'No se pudo eliminar el jugador'
    //     });
    //   }
    // });

    // Simulación temporal (quitar cuando tengas el servicio)
    this.jugadores = this.jugadores.filter(j => j.id !== jugador.id);
    
    this.messageService.add({
      severity: 'success',
      summary: 'Éxito',
      detail: `${jugador.nombre_juego} ha sido eliminado`
    });
  }

  cerrarModalEditar() {
    this.mostrarModalEditar = false;
    this.jugadorSeleccionado = null;
    this.jugadorOriginal = null;
    this.selectedAlianzaEdit = null;
  }

  exportarJugadores(): void {
    // Lógica para exportar jugadores
  }

  cargarAlianzas(): void {
    this.alianzaService.ListarAlianza().subscribe({
      next: (data: any) => {
        console.log('Datos recibidos al cargar alianzas:', data);
        if (data && Array.isArray(data.result)) {
          this.alianzas = data.result.map((a: any) => ({
            label: a.nombre_Alianza,
            value: a.id_Alianza
          }));
        } else {
          console.error('El formato de respuesta no es válido:', data);
        }
      },
      error: (err) => {
        console.error('Error al cargar alianzas:', err);
      }
    });
  }

  search(event: any): void {
    const query = event.query.toLowerCase();
    this.filteredAlianzas = this.alianzas.filter(a =>
      a.label.toLowerCase().includes(query)
    );
  }

  registrarJugador(): void {
    if (!this.jugadorNombre || !this.selectedAlianza) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Campos incompletos',
        detail: 'Debe ingresar nombre y alianza del jugador.'
      });
      return;
    }

    const parametros = {
      opcion: 'C',
      idJugador: this.jugadorId, 
      nombreJugador: this.jugadorNombre, 
      poder: this.jugadorPoder,
      kp: this.jugadorKp,
      idAlianza: this.selectedAlianza
    };

    this.jugadoresService.Jugadores(parametros).subscribe({
      next: (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Jugador registrado correctamente'
        });
        this.limpiarFormulario();
        this.listarJugadores();
      },
      error: (err) => {
        console.error('Error al registrar jugador:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo registrar el jugador'
        });
      }
    });
  }

  listarJugadores(): void {
    const parametros = {
      opcion: 'R'
    };

    this.jugadoresService.Jugadores(parametros).subscribe({
      next: (data: any) => {
        console.log('Datos recibidos al listar jugadores:', data);
        if (data && data.result && Array.isArray(data.result)) {
          this.jugadores = data.result;
        } else {
          console.error('Formato de datos inválido:', data);
        }
      },
      error: (err) => {
        console.error('Error al listar jugadores:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'No se pudo obtener la lista de jugadores.'
        });
      }
    });
  }

  limpiarFormulario(): void {
    this.jugadorId = null;
    this.jugadorNombre = '';
    this.jugadorPoder = null;
    this.jugadorKp = null;
    this.selectedAlianza = null;
  }
}
