import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OperationResult } from '../_model/operation.result';
import { CURDService, UtilitiesService } from '@pigfarm-core';
import { environment } from 'src/environments/environment';
import { AccountContract } from '../_model/evse/model';
@Injectable({
  providedIn: 'root'
})
export class AccountContractService extends CURDService<AccountContract> {

  constructor(http: HttpClient,utilitiesService: UtilitiesService)
  {
    super(environment.apiUrl,http,"AccountContract", utilitiesService);
  }
  showPassword(key): Observable<any> {
    const params = new FormData();
    params.append("key", key);
    return this.http.post<any>(`${this.base}AccountContract/ShowPassword`, params).pipe(catchError(this.handleError));
  }
  changePassword(model): Observable<OperationResult> {
    return this.http.put<OperationResult>(`${this.base}AccountContract/changePassword`, model).pipe(catchError(this.handleError));
  }
  insertForm(model: AccountContract): Observable<OperationResult> {
    for (const audit of this.audits) {
      let value2 = model[audit];
      if (value2 instanceof Date) {
        model[audit] = `${(value2 as Date).toLocaleDateString()} ${(value2 as Date).toLocaleTimeString('en-GB')}`
      }
    }
   
    const file = model.file;
    delete model.file;
    const params = this.utilitiesService.ToFormData(model);
    params.append("file", file);
    let query = '';
   
    return this.http.post<OperationResult>(`${this.base}AccountContract/AddForm?${query}`, params).pipe(catchError(this.handleError));
  }
  updateForm(model: AccountContract): Observable<OperationResult> {
    for (const audit of this.audits) {
      let value2 = model[audit];
      if (value2 instanceof Date) {
        model[audit] = `${(value2 as Date).toLocaleDateString()} ${(value2 as Date).toLocaleTimeString('en-GB')}`
      }
    }
   
    const file = model.file;
    delete model.file;
    const params = this.utilitiesService.ToFormData(model);
    params.append("file", file);
    let query = '';
  
    return this.http.put<OperationResult>(`${this.base}AccountContract/updateForm?${query}`, params).pipe(catchError(this.handleError));
  }

}
