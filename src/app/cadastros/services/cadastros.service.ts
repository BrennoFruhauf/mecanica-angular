import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Person } from '../model/person';
import { Observable, first, tap } from 'rxjs';
import { Address } from '../model/address';

@Injectable({
  providedIn: 'root',
})
export class CadastrosService {
  private readonly API: string = '/api/pessoas';

  constructor(private http: HttpClient) {}

  listAll() {
    return this.http.get<Person[]>(this.API).pipe(first());
  }

  save(record: Person) {
    return this.http.post<Person>(this.API, record).pipe(first());
  }

  clientCount() {
    return this.http.get<number>(`${this.API}/clientes`).pipe(first());
  }
}
