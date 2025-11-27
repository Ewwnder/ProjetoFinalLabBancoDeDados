import { Routes } from '@angular/router';
import { Servicos } from './components/servicos/servicos';
import { OrdemServico } from './components/ordem-servico/ordem-servico';

export const routes: Routes = [
  { path: '', redirectTo: 'servicos', pathMatch: 'full' },

  { path: 'servicos', component: Servicos },
  { path: 'ordem-servico', component: OrdemServico },
];