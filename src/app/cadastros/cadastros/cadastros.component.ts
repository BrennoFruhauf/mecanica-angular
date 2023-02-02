import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cadastros',
  templateUrl: './cadastros.component.html',
  styleUrls: ['./cadastros.component.scss'],
})
export class CadastrosComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  onAdd() {
    this.router.navigate(['new'], { relativeTo: this.route });
  }
}
