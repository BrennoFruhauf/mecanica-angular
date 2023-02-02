import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { CadastrosRoutingModule } from './cadastros-routing.module';
import { CadastrosComponent } from './cadastros/cadastros.component';
import { TabelaRegistrosComponent } from './components/tabela-registros/tabela-registros.component';
import { CadastroFormComponent } from './components/cadastro-form/cadastro-form.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CadastrosComponent,
    TabelaRegistrosComponent,
    CadastroFormComponent,
  ],
  imports: [
    CommonModule,
    CadastrosRoutingModule,
    NgxMaskDirective,
    NgxMaskPipe,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [provideNgxMask()],
})
export class CadastrosModule {}
