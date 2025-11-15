import { Component, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { LucideAngularModule, SwordsIcon, UserIcon, Flag, HouseIcon } from 'lucide-angular';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, LucideAngularModule],
  templateUrl: './dashboard-page.html',
  styleUrls: ['./dashboard-page.css'],
})
export class DashboardPageComponent {
  readonly SwordsIcon = SwordsIcon;
  readonly users = UserIcon;
  readonly flag = Flag;
  readonly home = HouseIcon;

  menuOpen = false;
  sidebarOpen = false;

  constructor(private router: Router) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }
  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  closeSidebarOnMobile() {
    // Cierra el sidebar solo en móvil cuando se hace clic en un link
    if (window.innerWidth <= 768) {
      this.sidebarOpen = false;
    }
  }
  // Cierra el menú si haces clic fuera de él
  @HostListener('document:click', ['$event'])
  clickOutside(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.user-profile')) {
      this.menuOpen = false;
    }
  }

  goToProfile() {
    this.menuOpen = false;
    this.router.navigate(['/perfil']); // Cambia por tu ruta real
  }

  logout() {
    this.menuOpen = false;
    // Aquí puedes limpiar el localStorage o token
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
