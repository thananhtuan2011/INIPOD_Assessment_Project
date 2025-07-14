import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

const UrlApi = environment.HOST_API + "/auth"
const access_token = "access_token";
const refresh_token = "refresh_token";
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private http = inject(HttpClient)
  private router = inject(Router);
  private cookieService = inject(CookieService)
  constructor(

  ) { }
  saveToken_cookie(accesstoken?: string, refreshtoken?: string) {
    if (accesstoken) {
      this.cookieService.set(access_token, accesstoken!, 365, '/', null!);
    }
    if (refreshtoken) this.cookieService.set(refresh_token, refreshtoken!, 365, '/', null!);
  }
  public getAccessToken() {
    return this.cookieService.get(access_token)
  }
  public getRefreshToken() {
    return this.cookieService.get(refresh_token)
  }
  public ClearCookie() {
    this.cookieService.delete(access_token, '/');
    this.cookieService.delete(refresh_token, '/');
  }


  public getIdUser() {
    const jwtHelper = new JwtHelperService();
    const jwt = jwtHelper.decodeToken(this.getAccessToken());
    if (jwt)
      return jwt["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier"];
    else
      return "";
  }


  public isJwtExpired() {
    if (!this.getAccessToken()) {
      return true;
    }

    const jwtHelper = new JwtHelperService();
    return jwtHelper.isTokenExpired(this.getAccessToken());
  }

  login(payload: any) {
    return this.http.post(UrlApi + '/login', payload);
  }


  Register(payload: any) {
    return this.http.post(UrlApi + '/register', payload);
  }


  RefreshToken(payload: any) {
    return this.http.post(UrlApi + '/Users/RefreshToken', payload);
  }


  refreshAccessToken(payload: any): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.logout();
      return throwError(() => new Error('Refresh token is missing'));
    }

    return this.http.post<any>(`${UrlApi}/Users/RefreshToken`, payload)
      .pipe(
        tap(response => this.saveToken_cookie(response.accessToken)),
        map(response => response.accessToken),
        catchError(err => {
          this.logout();
          return throwError(() => new Error('Token refresh failed'));
        })
      );
  }
  logout() {
    this.ClearCookie();
    this.router.navigate(['/auth/login'])
  }
}
