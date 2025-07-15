import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { BehaviorSubject, catchError, map, Observable, tap, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';
import { IUserLogin } from '../interface/iLogin.interface';
import { UserInfor } from '../interface/iUserInfor.interface';

const UrlApi = environment.HOST_API + "/auth"
const UserApi = environment.HOST_API + "/user"
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


  public isJwtExpired() {
    if (!this.getAccessToken()) {
      return true;
    }

    const jwtHelper = new JwtHelperService();
    return jwtHelper.isTokenExpired(this.getAccessToken());
  }

  login(payload: IUserLogin): Observable<any> {
    return this.http.post(UrlApi + '/login', payload);
  }

  GetInforUser(): Observable<UserInfor> {
    return this.http.get<UserInfor>(UserApi + '/GetInforUser');
  }
  Register(payload: any) {
    return this.http.post(UrlApi + '/register', payload);
  }



  refreshAccessToken(payload: any): Observable<any> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.router.navigate(['/auth/login']);
      return throwError(() => new Error('Refresh token is missing'));
    }

    return this.http.post<any>(`${UrlApi}/refreshToken`, payload)
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
