import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_ADDRESS_PATH } from 'src/environments/environment';
import { AddressAPI } from '../interface/addressAPI';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddressService {
  constructor(private http: HttpClient) {}

  getAddress(cep: string) {
    return this.http.get<AddressAPI>(`${API_ADDRESS_PATH}${cep}`).pipe(
      catchError((error) => {
        return of();
      })
    );
  }
}
