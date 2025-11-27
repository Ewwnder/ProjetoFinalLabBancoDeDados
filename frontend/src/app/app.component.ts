import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Servicos } from './components/servicos/servicos';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Servicos],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
