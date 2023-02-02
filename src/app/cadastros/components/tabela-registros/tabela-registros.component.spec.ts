import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaRegistrosComponent } from './tabela-registros.component';

describe('TabelaRegistrosComponent', () => {
  let component: TabelaRegistrosComponent;
  let fixture: ComponentFixture<TabelaRegistrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TabelaRegistrosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TabelaRegistrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
