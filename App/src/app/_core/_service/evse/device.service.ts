import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { CURDService, UtilitiesService } from '@pigfarm-core';
import { environment } from 'src/environments/environment';
import { Device } from '../../_model/evse/model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DeviceService extends CURDService<Device> {

  constructor(http: HttpClient,utilitiesService: UtilitiesService)
  {
    super(environment.apiUrl,http,"Device", utilitiesService);
  }
  getByGuid(guid): Observable<any> {
    return this.http.get<any>(`${this.base}Device/GetByGuid?guid=${guid}`, {});
  }
}
