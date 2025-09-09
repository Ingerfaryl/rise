import { Routes } from '@angular/router';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page';
import { Jugadores } from './pages/jugadores/jugadores';
import { Kvk } from './pages/kvk/kvk';
import { Mge } from './pages/mge/mge';
import { Alianza } from './pages/alianza/alianza';

export const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },

  {
    path: 'dashboard', component: DashboardPageComponent, children: [
      { path: 'jugadores', component: Jugadores },
      { path: 'kvk', component: Kvk },
      { path: 'mge', component: Mge },
      { path: 'alianza', component: Alianza }
    ]
  },
  { path: '**', redirectTo: '/dashboard' }
];