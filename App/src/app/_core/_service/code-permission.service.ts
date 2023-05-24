import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { CURDService, UtilitiesService } from '@pigfarm-core';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { CodePermission } from '../_model/code-permission';
@Injectable({
  providedIn: 'root'
})
export class CodePermissionService extends CURDService<CodePermission> {

  constructor(http: HttpClient,utilitiesService: UtilitiesService)
  {
    super(environment.apiUrl,http,"CodePermission", utilitiesService);
  }
  getPermissionsByRoleId(role): Observable<any> {
    return this.http.get<any>(`${this.base}CodePermission/getPermissionsByRoleId?role=${role}&lang=${localStorage.getItem("lang")}`, {});
  }
}
