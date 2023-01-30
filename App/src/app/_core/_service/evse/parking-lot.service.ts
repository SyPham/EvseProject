import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { CURDService, UtilitiesService } from '@pigfarm-core';
import { environment } from 'src/environments/environment';
import { ParkingLot } from '../../_model/evse/model';
@Injectable({
  providedIn: 'root'
})
export class ParkingLotService extends CURDService<ParkingLot> {

  constructor(http: HttpClient,utilitiesService: UtilitiesService)
  {
    super(environment.apiUrl,http,"ParkingLot", utilitiesService);
  }
  // toggleIsDefault(id): Observable<OperationResult> {
  //   return this.http.put<OperationResult>(`${this.base}ParkingLot/ToggleIsDefault?id=${id}`, {}).pipe(
  //     catchError(this.handleError)
  //   );
  // }
}
