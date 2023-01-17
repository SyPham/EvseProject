
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GiltTesting } from '../../config';
import { BehaviorSubject, Observable } from 'rxjs';
import { OperationResult } from 'src/app/_core/_model/operation.result';
import { CURDService, UtilitiesService } from '@pigfarm-core';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class GiltTestingService extends CURDService<GiltTesting> {
  private recordSource = new BehaviorSubject({} );
  currentGiltTesting = this.recordSource.asObservable();
  constructor( http: HttpClient,utilitiesService: UtilitiesService)
  {
    super(environment.apiUrl,http,"GiltTesting", utilitiesService);
  }
  changeGiltTesting(farm) {
    this.recordSource.next(farm)
  }
  toggleRecordDate(id): Observable<OperationResult> {
    return this.http.get<OperationResult>(`${this.base}GiltTesting/toggleRecordDate?id=${id}`, {});
  }
  getByRecordGuid(upperguid, upperrecord): Observable<any> {
    return this.http.get<any>(`${this.base}GiltTesting/GetByRecordGuid?upperguid=${upperguid}&upperrecord=${upperrecord}`, {});
  }
  demoConfigHeaderAndData(): Observable<any> {
    return this.http.get<any>(`${this.base}GiltTesting/DemoConfigHeaderAndData`, {});
  }

}
