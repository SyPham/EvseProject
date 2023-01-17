
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { OperationResult } from '../../_model/operation.result';
import { RecordAccountCheck } from '../../_model/apply-orders';
import { CURDService, UtilitiesService } from '@pigfarm-core';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class RecordAccountCheckService extends CURDService<RecordAccountCheck> {
  private recordSource = new BehaviorSubject({} );
  currentRecordAccountCheck = this.recordSource.asObservable();
  constructor( http: HttpClient,utilitiesService: UtilitiesService)
  {
    super(environment.apiUrl,http,"RecordAccountCheck", utilitiesService);
  }
  changeRecordAccountCheck(farm) {
    this.recordSource.next(farm)
  }
  toggleRecordDate(id): Observable<OperationResult> {
    return this.http.get<OperationResult>(`${this.base}RecordAccountCheck/toggleRecordDate?id=${id}`, {});
  }
  getByRecordGuid(upperguid, upperrecord): Observable<any> {
    return this.http.get<any>(`${this.base}RecordAccountCheck/GetByRecordGuid?upperguid=${upperguid}&upperrecord=${upperrecord}`, {});
  }
  getSelectedRecordAccount(p: {accounts: any[], guid: string}): Observable<any> {
    return this.http.post<any>(`${this.base}RecordAccountCheck/GetSelectedRecordAccount`, p);
  }
  
}
