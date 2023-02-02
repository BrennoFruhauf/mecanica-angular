import { Component } from '@angular/core';
import { Observable } from 'rxjs';

import { Person } from '../../model/person';
import { CadastrosService } from '../../services/cadastros.service';

@Component({
  selector: 'app-tabela-registros',
  templateUrl: './tabela-registros.component.html',
  styleUrls: ['./tabela-registros.component.scss'],
})
export class TabelaRegistrosComponent {
  persons: Observable<Person[]>;

  constructor(private cadastrosService: CadastrosService) {
    this.persons = this.cadastrosService.listAll();
  }
}
