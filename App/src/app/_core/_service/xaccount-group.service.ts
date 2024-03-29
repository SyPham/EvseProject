import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { XAccountGroup } from '../_model/xaccount-group';

import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OperationResult } from '../_model/operation.result';
import { CURDService, UtilitiesService } from '@pigfarm-core';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class XAccountGroupService extends CURDService<XAccountGroup> {

  constructor(http: HttpClient,utilitiesService: UtilitiesService)
  {
    super(environment.apiUrl,http,"XAccountGroup", utilitiesService);
  }
  getAccountGroup() {
    return this.http.get(`${this.base}XAccountGroup/GetAccountGroup`, {});
  }
  getPermissionsDropdown(accountGuid, lang) {
    return this.http.get<any>(`${this.base}XAccountGroup/getPermissionsDropdown?lang=${lang}&accountGuid=${accountGuid}`, {});
  }
  getPermissions(accountGuid, lang) {
    return this.http.get<any>(`${this.base}XAccountGroup/getPermissions?lang=${lang}&accountGuid=${accountGuid}`, {});
  }
  storePermission(model): Observable<OperationResult> {
    return this.http
      .post<OperationResult>(`${this.base}XAccountGroup/StorePermission`, model)
      .pipe(catchError(this.handleError));
  }

  storePermissionForCheckBox(model): Observable<OperationResult> {
    return this.http
      .post<OperationResult>(`${this.base}XAccountGroup/StorePermissionForCheckBox`, model)
      .pipe(catchError(this.handleError));
  }
  
}
