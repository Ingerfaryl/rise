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

import { KvkServices } from './services/kvk';

@Component({
  selector: 'app-kvk',
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
    Select
  ],
  templateUrl: './kvk.html',
  styleUrl: './kvk.css',
})
export class Kvk implements OnInit {

  constructor(private kvkServices: KvkServices) {} // ✅ Nomenclatura camelCase

  // ✅ Inicialización como arrays vacíos
  kvks: any[] = [];
  etapas: any[] = [];

  // Estado de carga
  loading: boolean = false;

  // Modelos de formulario
  kvk = { 
    nombre: '', 
    numero: '', 
    fechaInicio: null, 
    fechaFin: null 
  };
  
  etapa = { 
    kvk: null, // ⚠️ Este es el que usarás en el Select
    nombre: '', 
    fechaInicio: null, 
    fechaFin: null, 
    descripcion: '' 
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
      fechaFin: null
    };

    this.kvkServices.getKvkData(parametros).subscribe(
      (data) => {
        console.log('Respuesta del API:', data);
        this.kvks = data.result || [];
        console.log('✅ Datos KVK cargados:', this.kvks);
        this.loading = false;
      },
      (error) => {
        console.error(' Error al cargar datos KVK:', error);
        this.kvks = [];
        this.loading = false;
      }
    );
  }

  registrarKvk(): void {
    const nuevo = { 
      ...this.kvk, 
      id: this.kvks.length + 1 
    };
    this.kvks.push(nuevo);
    this.kvk = { 
      nombre: '', 
      numero: '', 
      fechaInicio: null, 
      fechaFin: null 
    };
  }

  registrarEtapa(): void {
    if (!this.etapa.kvk) {
      console.warn('⚠️ Debe seleccionar un KVK');
      return;
    }
    
    const nuevaEtapa = { ...this.etapa };
    this.etapas.push(nuevaEtapa);
    this.etapa = { 
      kvk: null, 
      nombre: '', 
      fechaInicio: null, 
      fechaFin: null, 
      descripcion: '' 
    };
  }
}