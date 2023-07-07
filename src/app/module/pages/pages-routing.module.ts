import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TemplateComponent } from './template/template.component';
import { HomeComponent } from './home/home.component';
import { DespesasMesComponent } from './filtroDespesas/despesas-mes/despesas-mes.component';
import { DespesasCategoriaComponent } from './filtroDespesas/despesas-categoria/despesas-categoria.component';
import { OrigemRecursoComponent } from './filtroDespesas/origem-recurso/origem-recurso.component';

const routes: Routes = [
  {path: '', component: TemplateComponent, children: [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'despesas-mes', component: DespesasMesComponent},
    {path: 'despesas-categoria', component: DespesasCategoriaComponent},
    {path: 'origem-recurso', component: OrigemRecursoComponent}
  ]
  }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
