import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CadastrosService } from '../services/cadastros.service';

@Component({
  selector: 'app-cadastros',
  templateUrl: './cadastros.component.html',
  styleUrls: ['./cadastros.component.scss'],
})
export class CadastrosComponent {
  clientCount: number = 0;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private cadastroService: CadastrosService
  ) {
    cadastroService
      .clientCount()
      .subscribe((count) => (this.clientCount = count));
  }

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
