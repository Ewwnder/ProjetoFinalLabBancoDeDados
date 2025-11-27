import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrdemServico } from './components/ordem-servico/ordem-servico';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, OrdemServico],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';
}
