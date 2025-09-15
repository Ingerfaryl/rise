import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LucideAngularModule, FileIcon, SwordsIcon, UserCheckIcon, UserIcon, Flag, Home, HouseIcon } from 'lucide-angular';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [RouterOutlet,LucideAngularModule],
  templateUrl: './dashboard-page.html',
  styleUrls: ['./dashboard-page.css']
})
export class DashboardPageComponent {
  title = 'Dashboard Page';
  readonly SwordsIcon = SwordsIcon;
  readonly users = UserIcon;
  readonly flag = Flag;
  readonly home = HouseIcon;
}
