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
import { ToastModule } from 'primeng/toast';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ConfirmationService, MessageService } from 'primeng/api';

import { KpEtapaService } from './service/kp-etapa';
import { KvkServices } from '../kvk/services/kvk';
import { RespuestaKvk } from '../kvk/interfaces';

@Component({
  selector: 'app-kp-etapa',
  imports: [
    CommonModule,
    FormsModule,
    AutoCompleteModule,
    CardModule,
    ButtonModule,
    InputTextModule,
    ToastModule,
    Select,
    TooltipModule,
    ToolbarModule,
    TableModule,
    DialogModule,
    ConfirmDialogModule,
    InputNumberModule,
  ],
  providers: [MessageService, ConfirmationService],
  templateUrl: './kp-etapa.html',
  styleUrl: './kp-etapa.css',
})
export class KpEtapa implements OnInit {
  etapasKp: any[] = [];
  kvkList: any[] = [];
  selectedKvk: any = null;
  etapasKvkList: any[] = [];
  selectedEtapaKvk: any = null;
  editingRowIndex: number | null = null;

  constructor(
    private KpEtapaService: KpEtapaService, private kvkServices: KvkServices, private messageService: MessageService) {}

  ngOnInit() {
    this.listarKvk();
  }

  listarKvk() {
    const parametros = {
      opcion: 'R',
      nombreKvk: '',
      numeroKvk: 0,
      fechaInicio: null,
      fechaFin: null,
    };

    this.kvkServices.getKvkData(parametros).subscribe({
      next: (data) => {
        if (data?.isSuccess && Array.isArray(data.result)) {
          this.kvkList = (data.result as RespuestaKvk[]).map((k: RespuestaKvk) => ({
            label: `${k.nombreKvk} #${k.numeroKvk}`,
            value: k.idKvk,
            data: k,
          }));
        } else {
          this.kvkList = [];
        }
      },
      error: (error) => {
        console.error('Error al obtener los datos KVK:', error);
      },
    });
  }

  onKvkChange(idKvk: any) {
    this.selectedEtapaKvk = null;
    this.etapasKp = [];
    this.etapasKvkList = [];

    if (!idKvk) {
      return;
    }

    const params = {
      opcion: 'S', 
      idKvk: idKvk,
    };

    this.kvkServices.getEtapasKvk(params).subscribe({
      next: (data) => {
        console.log('Etapas KVK recibidas:', data);
        if (data?.isSuccess && Array.isArray(data.result)) {
          this.etapasKvkList = data.result.map((e: any) => ({
            label: e.nombreEtapa,
            value: e.idEtapa,
            data: e,
          }));
        } else {
          this.etapasKvkList = [];
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al obtener etapas KVK'
        });
        console.error('Error al obtener etapas KVK:', err);
        this.etapasKvkList = [];
      },
    });
  }

  onEtapaChange(idEtapa: any) {
    if (!idEtapa) {
      this.etapasKp = [];
      return;
    }
    if (!this.selectedKvk) {
      return;
    }

    const params = {
      opcion: 'R',
      idJugador: 0,
      idEtapa: idEtapa,
      idKvk: this.selectedKvk,
      kpEtapa: 0,
      poderEtapa: 0,
    };

    this.KpEtapaService.getKpEtapa(params).subscribe({
      next: (data) => {
        if (data?.isSuccess && Array.isArray(data.result)) {
          this.etapasKp = data.result;
        } else {
          this.etapasKp = [];
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al obtener KP Etapa'
        });
        this.etapasKp = [];
      },
    });
  }
  guardarCambios(etapa: any) {
    const params = {
      opcion: 'U',
      idJugador: etapa.idJugadorRok,
      idEtapa: this.selectedEtapaKvk,
      idKvk: this.selectedKvk,
      kpEtapa: etapa.kpEtapa,
      poderEtapa: etapa.poderEtapa,
    }
    this.KpEtapaService.getKpEtapa(params).subscribe({
      next: (data) => {
        if (data?.isSuccess) {
          this.messageService.add({
            severity: 'success',
            summary: 'Éxito',
            detail: 'Cambios guardados correctamente'
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'No se pudieron guardar los cambios'
          });
        }
      },
      error: (err) => {
        console.error('Error en la solicitud:', err);
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error en la solicitud al guardar los cambios'
        });
      }
    });

    // Cerrar modo edición
    this.editingRowIndex = null;
  }
}
