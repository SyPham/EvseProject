import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SucklingWeighing } from '../../config';
import { BehaviorSubject, Observable } from 'rxjs';
import { CURDService, UtilitiesService } from '@pigfarm-core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SucklingWeighingService extends CURDService<SucklingWeighing> {
  private recordSource = new BehaviorSubject({} );
  currentSucklingWeighing = this.recordSource.asObservable();
  constructor(http: HttpClient, utilitiesService: UtilitiesService) {
    super(environment.apiUrl,http,"SucklingWeighing", utilitiesService);
  }
  changeSucklingWeighing(farm) {
    this.recordSource.next(farm)
  }

  getByRecordGuid(upperguid, upperrecord): Observable<any> {
    return this.http.get<any>(`${this.base}SucklingWeighing/GetByRecordGuid?upperguid=${upperguid}&upperrecord=${upperrecord}`, {});
  }
}