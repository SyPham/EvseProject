
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { RepairDetail } from '../../_model/repairs';
import { CURDService, UtilitiesService } from '@pigfarm-core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RepairDetailService extends CURDService<RepairDetail> {
  private biosSource = new BehaviorSubject({} );
  currentRepairDetail = this.biosSource.asObservable();
  constructor( http: HttpClient,utilitiesService: UtilitiesService)
  {
    super(environment.apiUrl,http,"RepairDetail", utilitiesService);
  }
  changeRepairDetail(farm) {
    this.biosSource.next(farm)
  }
  // toggleIsDefault(id): Observable<OperationResult> {
  //   return this.http.put<OperationResult>(`${this.base}BOM/ToggleIsDefault?id=${id}`, {}).pipe(
  //     catchError(this.handleError)
  //   );
  // }
}
