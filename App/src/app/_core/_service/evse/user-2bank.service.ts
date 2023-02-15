
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { OperationResult } from '../../_model/operation.result';
import { CURDService, UtilitiesService } from '@pigfarm-core';
import { environment } from 'src/environments/environment';
import { User2Bank } from '../../_model/evse/model';


@Injectable({
  providedIn: 'root'
})
export class User2BankService extends CURDService<User2Bank> {
  private recordSource = new BehaviorSubject(null );
  currentUser2Bank = this.recordSource.asObservable();

  private recordSource2 = new BehaviorSubject([] );
  currentUser2Bank2 = this.recordSource2.asObservable();
  constructor( http: HttpClient,utilitiesService: UtilitiesService)
  {
    super(environment.apiUrl,http,"User2Bank", utilitiesService);
  }
  changeUser2Bank(value) {
    this.recordSource.next(value)
  }
  getByGuid(guid): Observable<any> {
    return this.http.get<any>(`${this.base}User2Bank/GetByGuid?guid=${guid}`, {});
  }
}
