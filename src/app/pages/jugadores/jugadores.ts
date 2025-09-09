import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule, Table } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'primeng/tooltip';
import { ToolbarModule } from 'primeng/toolbar';
import { AutoCompleteModule } from 'primeng/autocomplete';

export interface Jugador {
  nombre: string;
  id: number;
  alianza: string;
  poder: number;
  kp: number;
}

@Component({
  selector: 'app-jugadores',
  standalone: true,
  imports: [
    ButtonModule,
    CommonModule,
    InputTextModule,
    CardModule,
    TableModule,
    FormsModule,
    AutoCompleteModule,
    TooltipModule,
    ToolbarModule
  ],
  templateUrl: './jugadores.html',
  styleUrls: ['./jugadores.css']
})
export class Jugadores {
  jugadores: Jugador[] = [];
  loading = false;
  globalFilter = '';
  useVirtualScroll: boolean = true;

  // Autocomplete
  alianzas = [
    { label: 'Alianza 1', value: 'Alianza 1' },
    { label: 'Alianza 2', value: 'Alianza 2' },
    { label: 'Alianza 3', value: 'Alianza 3' }
  ];
  filteredAlianzas: any[] = [];     // resultados filtrados
  selectedAlianza: any = null;      // lo que el usuario selecciona

  ngOnInit() {
    this.generarDatosDePrueba();
  }

  generarDatosDePrueba() {
    this.loading = true;
    this.jugadores = [];

    for (let i = 1; i <= 1000; i++) {
      this.jugadores.push({
        id: 1000000 + i,
        nombre: `Jugador ${i}`,
        alianza: `Alianza ${(i % 3) + 1}`,
        poder: Math.floor(Math.random() * 1000000) + 100000,
        kp: Math.floor(Math.random() * 100000) + 10000
      });
    }

    this.loading = false;
  }

  // 🔍 Autocomplete de alianzas
  search(event: any) {
    const query = event.query.toLowerCase();
    this.filteredAlianzas = this.alianzas.filter(a =>
      a.label.toLowerCase().includes(query)
    );
  }

  applyGlobalFilter(event: any) {
    this.globalFilter = (event.target as HTMLInputElement).value;
  }

  limpiarFiltros(table: Table) {
    table.clear();
    this.globalFilter = '';
  }

  getAlianzaBadgeClass(alianza: string): string {
    switch (alianza) {
      case 'Alianza 1': return 'text-blue-700 bg-blue-100';
      case 'Alianza 2': return 'text-green-700 bg-green-100';
      case 'Alianza 3': return 'text-purple-700 bg-purple-100';
      default: return 'text-gray-700 bg-gray-100';
    }
  }

  verJugador(jugador: Jugador) {
    console.log('Viendo detalles:', jugador);
  }

  editarJugador(jugador: Jugador) {
    console.log('Editando:', jugador);
  }

  eliminarJugador(jugador: Jugador) {
    this.jugadores = this.jugadores.filter(j => j.id !== jugador.id);
  }
}
