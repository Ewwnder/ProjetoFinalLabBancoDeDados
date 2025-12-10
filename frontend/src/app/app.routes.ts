import { Routes } from '@angular/router';
import { Servicos } from './components/servicos/servicos';
import { OrdemServico } from './components/ordem-servico/ordem-servico';
import { ResponsavelComponent } from './components/responsavel/responsavel.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { HomeComponent } from './components/home/home.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'home', component: HomeComponent},
  { path: 'servicos', component: Servicos },
  { path: 'ordem-servico', component: OrdemServico },
  { path: 'responsavel', component: ResponsavelComponent },
  { path: 'cliente', component: ClienteComponent}
];