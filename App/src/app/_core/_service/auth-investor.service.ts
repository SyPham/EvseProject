import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Subscription, throwError } from 'rxjs';
import { map, tap, delay, finalize, catchError } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApplicationUser } from '../_model/application-user';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CookieService } from 'ngx-cookie-service';
import { OperationResult } from '../_model/operation.result';

@Injectable({
  providedIn: 'root',
})
export class AuthInvestorService implements OnDestroy {
  baseUrl = environment.apiUrl + 'authInvestor/login';
  base = environment.apiUrl;

  private readonly apiUrl = `${environment.apiUrl}authInvestor`;
  private timer: Subscription;

  private storageEventListener(event: StorageEvent) {
    if (event.storageArea === localStorage) {
      // if (event.key === 'logout-event') {
      //   this.stopTokenTimer();
      // }
      // if (event.key === 'login-event') {
      //   this.stopTokenTimer();
      // }
      // if (event.key === 'refresh-token' || event.key === 'token') {
      //   if (event.newValue === 'undefined' || event.newValue === '' || event.newValue === null || event.newValue === undefined ) {
      //     this.logOut();
      //     window.location.reload();
      //   }
      // }
      // if (event.key === 'user') {
      //   if (event.oldValue !== null && JSON.stringify(event.oldValue) !== JSON.stringify(event.newValue)) {
      //     this.logOut();
      //     window.location.reload();
      //   }
      // }

    }
  }
  constructor(
    private http: HttpClient,
    private jwtHelper: JwtHelperService,
    private cookieService: CookieService  ) {
    window.addEventListener('storage', this.storageEventListener.bind(this));
  }

  ngOnDestroy(): void {
    window.removeEventListener('storage', this.storageEventListener.bind(this));
  }


  loginlanlord(username: string, password: string) {
    return this.http
      .post<OperationResult>(`${this.apiUrl}/login`, { username, password })
      .pipe(
        map(res => {
          const applicationUser = res.data as ApplicationUser;
          this.cookieService.set("refreshToken_investor", applicationUser.refreshToken,  {
            expires: 1000 * 60 * 365,
            domain: environment.domain,
            secure: true,
            sameSite:'Strict'
        })
          this.setLocalStorage(applicationUser);
          return applicationUser;
        })
      );
  }

  register(username, password) {
    return this.http
      .post<OperationResult>(`${this.apiUrl}/Register`, { username, password })
     ;
  }
  loginRememberMe(id) {
    return this.http
      .post<OperationResult>(`${this.apiUrl}/LoginRemember`, { id })
      .pipe(
        map(res => {
          const applicationUser = res.data as ApplicationUser;
          const user = res.data.user;
          this.setLocalStorage(applicationUser);
          return applicationUser;
        })
      );
  }

  
  refreshTokenInvestor() {
    const refreshToken = localStorage.getItem('refresh-token_investor');
    const token = localStorage.getItem('token_investor');
    if (!refreshToken || refreshToken === undefined + '') {
      this.clearLocalStorage();
      return of(null);
    }
    const timeout = this.jwtHelper.isTokenExpired();
    if (timeout === false) {
      return of(null);
    }
    return this.http
      .post<OperationResult>(`${this.apiUrl}/RefreshToken`, {token, refreshToken })
      .pipe(
        map( res => {
          const applicationUser = res.data as ApplicationUser;
          this.setLocalStorage(applicationUser);
          this.startTokenTimer();
          return applicationUser;
        }),
        catchError((err) => {
          this.clearLocalStorage();
          return throwError(err);
        }),
      );
  }

  
  setLocalStorage(data: ApplicationUser) {
    localStorage.setItem('user_investor', JSON.stringify(data.user));
    localStorage.setItem('token_investor', data.token);
    localStorage.setItem('refresh-token_investor', data.refreshToken);
    localStorage.setItem('login-event_investor', 'login' + Math.random());
  }

  

  clearLocalStorage() {
    localStorage.removeItem('user_investor');
    localStorage.removeItem('token_investor');
    localStorage.removeItem('refresh-token_investor');
    localStorage.removeItem('login-event_investor');
    localStorage.removeItem('functions_investor');
    localStorage.removeItem('menuItem_investor');
    localStorage.removeItem('farmGuid_investor');
    localStorage.removeItem('menus_investor');
    localStorage.removeItem('lastAction_investor');
    localStorage.setItem('logout-event_investor', 'logout' + Math.random());
  }
  private getTokenRemainingTime() {
    const accessToken = localStorage.getItem('token_investor');
    if (!accessToken) {
      return 0;
    }
    const jwtToken = JSON.parse(atob(accessToken.split('.')[1]));
    const expires = new Date(jwtToken.exp * 1000);
    return expires.getTime() - Date.now();
  }

  private startTokenTimer() {

    const timeout = this.getTokenRemainingTime();
    this.timer = of(true)
      .pipe(
        delay(timeout),
        tap(() => this.refreshTokenInvestor().subscribe())
      )
      .subscribe();
  }

  private stopTokenTimer() {
    this.timer?.unsubscribe();
  }
  private validToken() {
    const token = localStorage.getItem('token_investor');
    const pattern = /^[A-Za-z0-9-_=]+\.[A-Za-z0-9-_=]+\.?[A-Za-z0-9-_.+/=]*$/;
    const result = pattern.test(token);
    return result;
  }
  public loggedIn() {
    if (localStorage.getItem("access_token_investor")) {
      return true;
    }
    return false;
  }
  
  logOut() {
    const refreshToken = localStorage.getItem('refresh-token_investor');
    if (!refreshToken || refreshToken === undefined + '' || this.validToken() === false) {
      this.clearLocalStorage();
      return of(null);
    }
    return this.http
      .post(`${this.apiUrl}/logout`, {})
      .pipe(
        finalize(() => {
          this.clearLocalStorage();
          this.stopTokenTimer();
      })
      );
  }
  getMenus(lang) {
    return this.http.get<any>(`${this.base}SysMenu/getMenus?lang=${lang}`, {});
  }
  getPermissions(accountGuid, lang) {
    return this.http.get<any>(`${this.base}XAccount/getPermissions?accountGuid=${accountGuid}&lang=${lang}`, {});
  }
  getLanguages(lang) {
    const isAdminLang = JSON.parse(localStorage.getItem('user'))?.groupCode === 'ADMIN_LANGUAGE';
    if (isAdminLang) {
      return of({});
    }
    return this.http.get<any>(`${this.base}SystemLanguage/getLanguages?lang=${lang}`, {});
  }
  forgotPassword(email) {
    return this.http.get<any>(`${this.base}AuthInvestor/ForgotPassword?email=${email}`, {});
  }
  forgotUsername(data) {
    return this.http.post<any>(`${this.base}AuthInvestor/forgotUsername`, data);
  }
  resetPassword(data) {
    return this.http.post<any>(`${this.base}AuthInvestor/ResetPassword`, data);
  }
}
