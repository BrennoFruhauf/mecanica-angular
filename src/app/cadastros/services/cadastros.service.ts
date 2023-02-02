import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Person } from '../model/person';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CadastrosService {
  private readonly API: string = '/api/pessoas';

  constructor(private http: HttpClient) {}

  listAll() {
    return this.http.get<Person[]>(this.API);
  }
}