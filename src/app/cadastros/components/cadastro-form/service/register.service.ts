import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, of } from 'rxjs';

import { AddressAPI } from '../interface/addressAPI';
import { CnpjAPI } from '../interface/cnpjAPI';
import { VehicleAPI } from '../interface/vehicleAPI';
import {
  API_CNPJ_PATH,
  API_VEHICLE_PATH,
  API_ADDRESS_PATH,
} from './../../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  constructor(private http: HttpClient) {}

  getAddress(cep: string) {
    return this.http.get<AddressAPI>(`${API_ADDRESS_PATH}${cep}`);
  }

  getVehicle(board: string) {
    return this.http
      .get<VehicleAPI>(`${API_VEHICLE_PATH}${board}`)
      .pipe(catchError((error) => of()));
  }

  getCNPJ(cnpj: string) {
    return this.http.get<CnpjAPI>(`${API_CNPJ_PATH}${cnpj}`);
  }
}
