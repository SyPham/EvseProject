import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from '../_service/auth.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(
        request: HttpRequest<unknown>,
        next: HttpHandler
    ): Observable<HttpEvent<unknown>> {
        // add JWT auth header if a user is logged in for API requests
        const pathname = document.location.pathname;
        if (pathname.indexOf('mobile/landlord') !== -1) {
            const accessToken = localStorage.getItem('token_landlord');
            const isApiUrl = request.url.startsWith(environment.apiUrl);
            if (accessToken && isApiUrl) {
                request = request.clone({
                    setHeaders: { Authorization: `Bearer ${accessToken}` },
                });
            }
        }
        else if (pathname.indexOf('mobile/engineer') !== -1) {
            const accessToken = localStorage.getItem('token_engineer');
            const isApiUrl = request.url.startsWith(environment.apiUrl);
            if (accessToken && isApiUrl) {
                request = request.clone({
                    setHeaders: { Authorization: `Bearer ${accessToken}` },
                });
            }
        }
        else {
            const accessToken = localStorage.getItem('token');
            const isApiUrl = request.url.startsWith(environment.apiUrl);
            if (accessToken && isApiUrl) {
                request = request.clone({
                    setHeaders: { Authorization: `Bearer ${accessToken}` },
                });
            }
        }
       

        return next.handle(request);
    }
}
