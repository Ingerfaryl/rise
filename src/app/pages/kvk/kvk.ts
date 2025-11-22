import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DatePicker } from 'primeng/datepicker';
import { TextareaModule } from 'primeng/textarea';
import { Select } from 'primeng/select';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Toast } from 'primeng/toast';

import { KvkServices } from './services/kvk';

@Component({
  selector: 'app-kvk',
  standalone: true,
  imports: [
    DatePicker,
    CommonModule,
    ButtonModule,
    CardModule,
    InputTextModule,
    TableModule,
    FormsModule,
    TooltipModule,
    ToolbarModule,
    AutoCompleteModule,
    TextareaModule,
    Select,
    Toast
  ],
  providers: [ConfirmationService, MessageService],
  templateUrl: './kvk.html',
  styleUrls: ['./kvk.css'],
})
export class Kvk implements OnInit {
  constructor(
    private kvkServices: KvkServices,
    private messageService: MessageService
  ) {}

  kvks: any[] = [];
  etapas: any[] = [];

  // Estado de carga
  loading: boolean = false;
  kvkSeleccionado: number | null = null;
  loadingEtapas: boolean = false;

  // Modelos de formulario
  kvk = {
    nombre: '',
    numero: '',
    fechaInicio: null,
    fechaFin: null,
  };

  etapa = {
    kvk: null,
    nombre: '',
    fechaInicio: null,
    fechaFin: null,
    descripcion: '',
  };

  ngOnInit(): void {
    this.listarKvk();
  }

  listarKvk(): void {
    this.loading = true;

    const parametros = {
      opcion: 'R',
      nombreKvk: '',
      numeroKvk: 0,
      fechaInicio: null,
      fechaFin: null,
    };

    this.kvkServices.getKvkData(parametros).subscribe(
      (data) => {
        this.kvks = data.result || [];
        this.kvks = this.kvks.map((k: any) => ({
          ...k,
          display: `${k.nombreKvk || ''}${k.numeroKvk ? ' (N°' + k.numeroKvk + ')' : ''}`,
        }));
        this.loading = false;
      },
      (error) => {
        this.kvks = [];
        this.loading = false;
      }
    );
  }

  registrarKvk(): void {
    // Validar que ambas fechas existan antes de compararlas
    if (this.kvk.fechaInicio != null && this.kvk.fechaFin != null && this.kvk.fechaFin < this.kvk.fechaInicio) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'La fecha de fin no puede ser anterior a la fecha de inicio',
        life: 3000
      });
      return;
    }

    const parametros = {
      opcion: 'C',
      nombreKvk: this.kvk.nombre,
      numeroKvk: this.kvk.numero,
      fechaInicio: this.kvk.fechaInicio,
      fechaFin: this.kvk.fechaFin,
    };
    this.kvkServices.getKvkData(parametros).subscribe(
      (response) => {
        this.kvk = { nombre: '', numero: '', fechaInicio: null, fechaFin: null };
        this.listarKvk();
      },
      (error) => {
        console.error(' Error al registrar KVK:', error);
      }
    );
    this.listarKvk();
  }

  listarEtapas(): void {
    this.loadingEtapas = true;

    const parametros = {
      opcion: 'R',
      idKvk: 0,
      nombreEtapa: '',
      detalles: '',
      fechaInicio: null,
      fechaFin: null,
    };

    this.kvkServices.getEtapasKvk(parametros).subscribe(
      (data) => {
        this.etapas = data.result || [];

        this.loadingEtapas = false;
      },
      (error) => {
        console.error('Error al listar Etapas:', error);
        this.etapas = [];
        this.loadingEtapas = false;
      }
    );
  }

  registrarEtapa(): void {
    if (!this.etapa.kvk) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Por favor selecciona un KVK',
        life: 3000,
      });
      return;
    }

    if (!this.etapa.nombre) {
      this.messageService.add({
        severity: 'warn',
        summary: 'Advertencia',
        detail: 'Por favor ingresa el nombre de la etapa',
        life: 3000,
      });
      return;
    }

    const parametros = {
      opcion: 'C',
      idKvk: this.etapa.kvk,
      nombreEtapa: this.etapa.nombre,
      detalles: this.etapa.descripcion,
      fechaInicio: this.etapa.fechaInicio,
      fechaFin: this.etapa.fechaFin,
    };

    this.kvkServices.getEtapasKvk(parametros).subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: 'Éxito',
          detail: 'Etapa registrada exitosamente',
          life: 3000
        });

        const kvkSeleccionado = this.etapa.kvk;
        this.etapa = {
          kvk: kvkSeleccionado,
          nombre: '',
          fechaInicio: null,
          fechaFin: null,
          descripcion: '',
        };

        // Recargar etapas
        this.listarEtapas();
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Error al registrar la etapa. Por favor intenta de nuevo.',
          life: 3000
        });
        console.error('❌ Error al registrar Etapa KVK:', error);
      }
    );
  }
  filtrarEtapasPorKvk(): void {
    if (!this.kvkSeleccionado) {
      this.etapas = [];
      return;
    }

    this.loadingEtapas = true;

    const parametros = {
      opcion: 'S',
      idKvk: this.kvkSeleccionado,
    };

    this.kvkServices.getEtapasKvk(parametros).subscribe(
      (data) => {
        this.etapas = (data.result || []).map((et: { idKvk: any; }) => ({
          ...et,
          kvkInfo: this.kvks.find((k) => k.idKvk === et.idKvk),
        }));

        this.loadingEtapas = false;
      },
      (error) => {
        console.error('Error filtrando etapas por KVK:', error);
        this.etapas = [];
        this.loadingEtapas = false;
      }
    );
  }
}
