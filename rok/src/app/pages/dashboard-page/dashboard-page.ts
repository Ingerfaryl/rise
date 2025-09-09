import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './dashboard-page.html',
  styleUrls: ['./dashboard-page.css']
})
export class DashboardPageComponent {
  tittle = 'Dashboard Page';
}
