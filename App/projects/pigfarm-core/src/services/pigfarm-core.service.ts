import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { OperationResult } from "../_core/models/application-user";

@Injectable({
  providedIn: "root",
})
export class PigfarmCoreService {
  private recordSource = new BehaviorSubject({} );
  currentRecordEarTag = this.recordSource.asObservable();
  private recordLabelSource = new BehaviorSubject(null);
  currentRecordLabel = this.recordLabelSource.asObservable();
  
  constructor(private http: HttpClient,
    @Inject("Env") private base
    ) {}
  changeRecordEarTag(farm) {
    this.recordSource.next(farm)
  }
  changLable(value) {
    this.recordLabelSource.next(value)
  }
  getBreedingByFarmGuid(farmGuid) {
    return this.http.get<any>(`${this.base}Breeding/GetBreedingByFarmGuid?farmGuid=${farmGuid}`, {});
  }
  getMakeOrderByFarmGuid(farmGuid) {
    return this.http.get<any>(
      `${this.base}MakeOrder/GetMakeOrderByFarmGuid?farmGuid=${farmGuid}`,
      {}
    );
  }

  getMakeOrderByFarmGuidAndPigType(farmGuid,pigType) {
    return this.http.get<any>(`${this.base}MakeOrder/GetMakeOrderByFarmGuidAndPigType?farmGuid=${farmGuid}&pigType=${pigType}`, {});
  }
  removeRecord2Pig(model): Observable<OperationResult> {
    return this.http
      .post<OperationResult>(`${this.base}Record/RemoveRecord2Pen`, model)
      .pipe(catchError(this.handleError));
  }
  addRecord2Pig(model): Observable<OperationResult> {
    return this.http
      .post<OperationResult>(`${this.base}Record/AddRecord2Pen`, model)
      .pipe(catchError(this.handleError));
  }
  getPensByFarmGuidOrRoomGuid(farmGuid, roomGuid): Observable<any> {
    return this.http.get<any>(`${this.base}Pen/getPensByFarmGuidOrRoomGuid?farmGuid=${farmGuid}&roomGuid=${roomGuid}`, {});
  }
  getByFarmGuid(farmGuid) {
    return this.http.get<any>(`${this.base}RecordSale/GetByFarmGuid?farmGuid=${farmGuid}`, {});
  }
  getRoomsByFarmGuid(farmGuid, barnGuid,makeOrderGuid): Observable<any> {
    return this.http.get<any>(`${this.base}Room/GetRoomsByFarmGuid?farmGuid=${farmGuid}&barnGuid=${barnGuid}&makeOrderGuid=${makeOrderGuid}`, {});
  }
  getBreeding2SowInByBreedingGuid(breedingGuid) {
    return this.http.get<any>(`${this.base}Breeding/GetBreeding2SowInByBreedingGuid?breedingGuid=${breedingGuid}`, {});
  }

  protected handleError(errorResponse: any) {
    if (errorResponse instanceof HttpErrorResponse) {
      if (errorResponse.status === 401) {
        return throwError(errorResponse.statusText);
      }
      const applicationError = errorResponse.headers.get('Application-Error');
      if (applicationError) {
        console.error(applicationError);
        return throwError(applicationError);
      }
      const serverError = errorResponse.error;
      let modalStateErrors = '';
      if (serverError && typeof serverError === 'object') {
        for (const key in serverError) {
          if (serverError[key]) {
            modalStateErrors += serverError[key] + '\n';
          }
        }
      }
      return throwError(modalStateErrors || serverError || 'Server Error');
    }
  }
  
}
