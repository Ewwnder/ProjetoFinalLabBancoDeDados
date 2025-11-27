import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { Servicos } from './components/servicos/servicos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, Servicos],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {}
