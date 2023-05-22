import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { CURDService, OperationResult, UtilitiesService } from '@pigfarm-core';
import { environment } from 'src/environments/environment';
import { Investor } from '../../_model/evse/model';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class InvestorService extends CURDService<Investor> {

  constructor(http: HttpClient,utilitiesService: UtilitiesService)
  {
    super(environment.apiUrl,http,"Investor", utilitiesService);
  }

  insertForm(model: Investor): Observable<OperationResult> {
    for (const key in model) {
      if (Object.prototype.hasOwnProperty.call(model, key)) {
        let item = model[key];
        if (item instanceof Date) {
          model[key] = `${(item as Date).toLocaleDateString()} ${(item as Date).toLocaleTimeString('en-GB')}`
        }
      }
    }
    const file = model.file;
    delete model.file;
    const params = this.utilitiesService.ToFormData(model);
    params.append("file", file);
    return this.http.post<OperationResult>(`${this.base}Investor/AddForm`, params).pipe(catchError(this.handleError));
  }
  updateForm(model: Investor): Observable<OperationResult> {
    for (const key in model) {
      if (Object.prototype.hasOwnProperty.call(model, key)) {
        let item = model[key];
        if (item instanceof Date) {
          model[key] = `${(item as Date).toLocaleDateString()} ${(item as Date).toLocaleTimeString('en-GB')}`
        }
      }
    }

    const file = model.file;
    delete model.file;
    const params = this.utilitiesService.ToFormData(model);
    params.append("file", file);

    return this.http.put<OperationResult>(`${this.base}Investor/updateForm`, params).pipe(catchError(this.handleError));
  }
  getByGuid(guid): Observable<any> {
    return this.http.get<any>(`${this.base}Investor/GetByGuid?guid=${guid}`, {});
  }
}
