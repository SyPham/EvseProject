import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { CURDService, OperationResult, UtilitiesService } from '@pigfarm-core';

import { environment } from 'src/environments/environment';
import { EngineerErrorReport } from '../../_model/evse/model';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class EngineerErrorReportService extends CURDService<EngineerErrorReport> {
  private recordSource = new BehaviorSubject(null );
  currentEngineerErrorReport = this.recordSource.asObservable();
  changeEngineerErrorReport(value) {
    this.recordSource.next(value)
  }
  constructor(http: HttpClient,utilitiesService: UtilitiesService)
  {
    super(environment.apiUrl,http,"EngineerErrorReport", utilitiesService);
  }
  getByGuid(guid): Observable<any> {
    return this.http.get<any>(`${this.base}EngineerErrorReport/GetByGuid?guid=${guid}`, {});
  }
  insertForm(model: EngineerErrorReport): Observable<OperationResult> {
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
    return this.http.post<OperationResult>(`${this.base}EngineerErrorReport/AddForm`, params).pipe(catchError(this.handleError));
  }
  updateForm(model: EngineerErrorReport): Observable<OperationResult> {
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

    return this.http.put<OperationResult>(`${this.base}EngineerErrorReport/updateForm`, params).pipe(catchError(this.handleError));
  }
  removeFile(id, type): Observable<OperationResult> {
    return this.http.post<OperationResult>(`${this.base}EngineerErrorReport/Remove?id=${id}&type=${type}`, {}).pipe(catchError(this.handleError));
  }
}
