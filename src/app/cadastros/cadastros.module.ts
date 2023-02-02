import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CadastrosRoutingModule } from './cadastros-routing.module';
import { CadastrosComponent } from './cadastros/cadastros.component';
import { TabelaRegistrosComponent } from './components/tabela-registros/tabela-registros.component';

@NgModule({
  declarations: [CadastrosComponent, TabelaRegistrosComponent],
  imports: [CommonModule, CadastrosRoutingModule],
})
export class CadastrosModule {}
