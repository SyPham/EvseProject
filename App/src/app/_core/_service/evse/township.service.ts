import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Township } from '../../_model/evse/model';
import { HttpClient } from '@angular/common/http';
import { CURDService, OperationResult, UtilitiesService } from '@pigfarm-core';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class TownshipService extends CURDService<Township> {

  constructor(http: HttpClient,utilitiesService: UtilitiesService)
  {
    super(environment.apiUrl,http,"Township", utilitiesService);
  }
 
  getByGuid(guid): Observable<any> {
    return this.http.get<any>(`${this.base}Township/GetByGuid?guid=${guid}`, {});
  }
}
