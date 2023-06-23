import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { environment } from 'src/environments/environment';
import { ElectricianErrorReport } from '../../_model/evse/model';
import { BehaviorSubject, Observable } from 'rxjs';
import { CURDService, OperationResult, UtilitiesService } from '@pigfarm-core';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ElectricianErrorReportService extends CURDService<ElectricianErrorReport> {
  private recordSource = new BehaviorSubject(null );
  currentElectricianErrorReport = this.recordSource.asObservable();
  changeElectricianErrorReport(value) {
    this.recordSource.next(value)
  }
  constructor(http: HttpClient,utilitiesService: UtilitiesService)
  {
    super(environment.apiUrl,http,"ElectricianErrorReport", utilitiesService);
  }
  getByGuid(guid): Observable<any> {
    return this.http.get<any>(`${this.base}ElectricianErrorReport/GetByGuid?guid=${guid}`, {});
  }
  insertForm(model: ElectricianErrorReport): Observable<OperationResult> {
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
    return this.http.post<OperationResult>(`${this.base}ElectricianErrorReport/AddForm`, params).pipe(catchError(this.handleError));
  }
  updateForm(model: ElectricianErrorReport): Observable<OperationResult> {
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

    return this.http.put<OperationResult>(`${this.base}ElectricianErrorReport/updateForm`, params).pipe(catchError(this.handleError));
  }
}
