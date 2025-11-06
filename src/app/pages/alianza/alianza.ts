import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { AlianzaService } from './services/alianzaservice';

@Component({
  selector: 'app-alianza',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    FormsModule
  ],
  templateUrl: './alianza.html',
  styleUrls: ['./alianza.css']
})
export class Alianza {
  filtro: string = '';
  alianzas: any[] = [];
  loading = false;

  constructor(private alianzaService: AlianzaService) { }

  buscar() {
    this.loading = true;

    const parametros = {
      opcion: 'R',
      idAlianza: 15,
      nombreAlianza: this.filtro,
      siglas: ''
    };

    this.alianzaService.gestionarAlianza(parametros).subscribe({
      next: (data) => {
        this.alianzas = data.result ?? [];
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al obtener alianzas', err);
        this.loading = false;
      }
    });
  }
}
