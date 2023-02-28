import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { CURDService, UtilitiesService } from '@pigfarm-core';
import { environment } from 'src/environments/environment';
import { ReportError } from '../../_model/evse/model';
import { BehaviorSubject, Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ReportErrorService extends CURDService<ReportError> {
  private recordSource = new BehaviorSubject(null );
  currentReportError = this.recordSource.asObservable();
  changeReportError(value) {
    this.recordSource.next(value)
  }
  constructor(http: HttpClient,utilitiesService: UtilitiesService)
  {
    super(environment.apiUrl,http,"ReportError", utilitiesService);
  }
  getByGuid(guid): Observable<any> {
    return this.http.get<any>(`${this.base}ReportError/GetByGuid?guid=${guid}`, {});
  }
}
