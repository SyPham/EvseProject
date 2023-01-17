import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SucklingTeachingSlot } from '../../config';
import { BehaviorSubject, Observable } from 'rxjs';
import { CURDService, UtilitiesService } from '@pigfarm-core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SucklingTeachingSlotService extends CURDService<SucklingTeachingSlot> {
  private recordSource = new BehaviorSubject({} );
  currentSucklingTeachingSlot = this.recordSource.asObservable();
  constructor(http: HttpClient, utilitiesService: UtilitiesService) {
    super(environment.apiUrl,http,"SucklingTeachingSlot", utilitiesService);
  }
  changeSucklingTeachingSlot(farm) {
    this.recordSource.next(farm)
  }

  getByRecordGuid(upperguid, upperrecord): Observable<any> {
    return this.http.get<any>(`${this.base}SucklingTeachingSlot/GetByRecordGuid?upperguid=${upperguid}&upperrecord=${upperrecord}`, {});
  }
}