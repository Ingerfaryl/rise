import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule, Table } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DatePicker } from 'primeng/datepicker';
@Component({
  selector: 'app-kvk',
  imports: [DatePicker, CommonModule, ButtonModule, CardModule, InputTextModule, TableModule, FormsModule, TooltipModule, ToolbarModule, AutoCompleteModule],
  templateUrl: './kvk.html',
  styleUrl: './kvk.css'
})
export class Kvk {
  kvks: any[] = [];        // lista total de KVKs
  filteredKvks: any[] = []; // lista filtrada para autocomplete
  etapas: any[] = [];

  kvk = { nombre: '', numero: '', fechaInicio: null, fechaFin: null };
  etapa = { kvk: null, nombre: '', fechaInicio: null, fechaFin: null, descripcion: '' };

  registrarKvk() {
    const nuevo = { ...this.kvk, id: this.kvks.length + 1 };
    this.kvks.push(nuevo);
    this.kvk = { nombre: '', numero: '', fechaInicio: null, fechaFin: null };
  }

  registrarEtapa() {
    const nuevaEtapa = { ...this.etapa };
    this.etapas.push(nuevaEtapa);
    this.etapa = { kvk: null, nombre: '', fechaInicio: null, fechaFin: null, descripcion: '' };
  }

  // 🔎 método para filtrar KVKs en el autocomplete
  searchKvks(event: any) {
    const query = event.query.toLowerCase();
    this.filteredKvks = this.kvks.filter(kvk =>
      kvk.nombre.toLowerCase().includes(query)
    );
  }
}
