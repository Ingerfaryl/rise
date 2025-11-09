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

import { AlianzaService } from '../alianza/services/alianzaservice';
import { JugadoresService } from './services/jugadores';
import { MessageService } from 'primeng/api';

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
    Toast
  ],
  providers: [MessageService],
  templateUrl: './jugadores.html',
  styleUrls: ['./jugadores.css']
})

export class Jugadores implements OnInit {
  alianzas: any[] = []; 
  filteredAlianzas: any[] = [];
  selectedAlianza: any = null;  
  filtro: any;
  jugadores: any[] = [];

  // Campos del formulario
  jugadorNombre: string = '';
  jugadorId: number | null = null;
  jugadorPoder: number | null = null;
  jugadorKp: number | null = null;

  constructor(
    private alianzaService: AlianzaService,
    private jugadoresService: JugadoresService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    this.cargarAlianzas();
    this.listarJugadores();
  }

  cargarAlianzas(): void {
    this.alianzaService.ListarAlianza().subscribe({
      next: (data: any) => {
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
    this.listarJugadores();
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
