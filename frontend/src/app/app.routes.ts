import { Routes } from '@angular/router';
import { Servicos } from './components/servicos/servicos';
import { OrdemServico } from './components/ordem-servico/ordem-servico';
import { ResponsavelComponent } from './components/responsavel/responsavel.component';

export const routes: Routes = [
  { path: '', redirectTo: 'servicos', pathMatch: 'full' },

  { path: 'servicos', component: Servicos },
  { path: 'ordem-servico', component: OrdemServico },
  { path: 'responsavel', component: ResponsavelComponent }
];