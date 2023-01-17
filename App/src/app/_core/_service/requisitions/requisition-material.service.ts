
import { HttpClient } from '@angular/common/http';
  import { Injectable } from '@angular/core';
  import { BehaviorSubject } from 'rxjs';
  import { RequisitionMaterial } from '../../_model/requisitions';
import { CURDService, UtilitiesService } from '@pigfarm-core';
import { environment } from 'src/environments/environment';


  @Injectable({
    providedIn: 'root'
  })
  export class RequisitionMaterialService extends CURDService<RequisitionMaterial> {
    private biosSource = new BehaviorSubject({} );
    currentRequisitionMaterial = this.biosSource.asObservable();
    constructor( http: HttpClient,utilitiesService: UtilitiesService)
    {
      super(environment.apiUrl,http,"RequisitionMaterial", utilitiesService);
    }
    changeRequisitionMaterial(farm) {
      this.biosSource.next(farm)
    }
    // toggleIsDefault(id): Observable<OperationResult> {
    //   return this.http.put<OperationResult>(`${this.base}BOM/ToggleIsDefault?id=${id}`, {}).pipe(
    //     catchError(this.handleError)
    //   );
    // }
  }
