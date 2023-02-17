import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { CURDService, UtilitiesService } from '@pigfarm-core';
import { environment } from 'src/environments/environment';
import { User2Message } from '../../_model/evse/model';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class User2MessageService extends CURDService<User2Message> {

  constructor(http: HttpClient,utilitiesService: UtilitiesService)
  {
    super(environment.apiUrl,http,"User2Message", utilitiesService);
  }
  getByGuid(guid): Observable<any> {
    return this.http.get<any>(`${this.base}User2Message/GetByGuidV2?guid=${guid}`, {});
  }

  countByUserId(guid): Observable<any> {
    debugger
    return this.http.get<any>(`${this.base}User2Message/CountByUserId?guid=${guid}`, {});
  }
}
