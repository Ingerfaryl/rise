import { Component, OnInit } from '@angular/core';
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
export class Alianza implements OnInit {
  filtro: string = '';
  alianzas: any[] = [];
  loading = false;

  constructor(private alianzaService: AlianzaService) {}

  ngOnInit(): void {
    this.listarAlianzas();
  }

  listarAlianzas() {
    this.loading = true;
    this.alianzaService.gestionarAlianza({ opcion: 'R' }).subscribe({
      next: (data) => {
        this.alianzas = data.result || []; 
        console.log('Alianzas cargadas:', this.alianzas);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al listar alianzas', err);
        this.loading = false;
      }
    });
  }
}
