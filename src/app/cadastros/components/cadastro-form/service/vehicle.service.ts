import { API_VEHICLE_PATH } from './../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { VehicleAPI } from '../interface/vehicleAPI';
import { catchError, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  constructor(private http: HttpClient) {}

  getVehicle(board: string) {
    return this.http.get<VehicleAPI>(`${API_VEHICLE_PATH}${board}`).pipe(
      catchError((error) => {
        return of();
      })
    );
  }
}
