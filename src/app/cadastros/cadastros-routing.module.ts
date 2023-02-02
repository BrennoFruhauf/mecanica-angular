import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastrosComponent } from './cadastros/cadastros.component';
import { CadastroFormComponent } from './components/cadastro-form/cadastro-form.component';

const routes: Routes = [
  { path: '', component: CadastrosComponent },
  { path: 'new', component: CadastroFormComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CadastrosRoutingModule {}
