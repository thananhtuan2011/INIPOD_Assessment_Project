import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, Observable, tap, throwError } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

const UrlApi = environment.HOST_API + "/api"
const access_token = "access_token";
const refresh_token = "refresh_token";
@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private jwt = '';
  private http = inject(HttpClient)
  private router = inject(Router);
  // authService = inject(SocialAuthService);
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
  public ClearLocalStorage() {
    localStorage.removeItem("business")
    localStorage.removeItem("isRunning")
    localStorage.removeItem("ResumeData")
  }

  public getRole() {
    const jwtHelper = new JwtHelperService();
    const jwt = jwtHelper.decodeToken(this.getAccessToken());
    if (jwt)
      return jwt["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
    else
      return "";
  }
  public getBusinessRole() {
    const jwtHelper = new JwtHelperService();
    const jwt = jwtHelper.decodeToken(this.getAccessToken());
    if (jwt)
      return jwt["businessRole"];
    else
      return "";
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
      // Not exists => expired
      return true;
    }

    const jwtHelper = new JwtHelperService();
    return jwtHelper.isTokenExpired(this.getAccessToken());
  }



  UpdateTimer(payload: any) {
    return this.http.post(UrlApi + '/Users/UpdateTimer', payload);
  }
  login(payload: any) {
    return this.http.post(UrlApi + '/Users/Login', payload);
  }
  CheckTimer() {
    return this.http.get(UrlApi + `/Users/CheckTimer`);
  }
  SignIn(email: string, code: string) {
    return this.http.get(UrlApi + `/Users/SignIn?email=${email}&code=${code}`);
  }
  GetUser(): Observable<any> {
    return this.http.get<any>(UrlApi + `/Users/GetUserProfile`);
  }
  GetUserByBusinessId(businessId: string): Observable<any> {
    return this.http.get<any>(UrlApi + `/Users/business/` + businessId);
  }

  UpdateUserProfile(payload: any) {
    return this.http.put(UrlApi + '/Users/UpdateUserProfile', payload);
  }
  UpdateUserProfileByEmail(payload: any) {
    return this.http.put(UrlApi + '/Users/UpdateUserProfileByEmail', payload);
  }

  SignUp(payload: any) {
    return this.http.post(UrlApi + `/Users/SignUp`, payload);
  }

  ResendCode(email: string) {
    return this.http.get(UrlApi + `/Users/ResendCode?email=${email}`);
  }

  RecoverPassword(email: string) {
    return this.http
      .get(UrlApi + `/Users/RecoverPassword?email=${email}`, {
      })
  }
  DeleteUser(payload: any): Observable<boolean> {
    return this.http.post<boolean>(UrlApi + '/Users/DeleteUser', payload);
  }

  GetAllUser(payload: any) {
    return this.http.get(UrlApi + `/Users/GetAllUser?Page=${payload.Page}&PageSize=${payload.PageSize}&Search=${payload.Search}`);
  }

  Register(payload: any) {
    return this.http.post(UrlApi + '/Users/Register', payload);
  }
  ChangePassWithToken(payload: any) {
    return this.http.put(UrlApi + `/Users/ChangePassWithToken`, payload);
  }

  creatNewUser(payload: any) {
    return this.http.post(UrlApi + '/Users', payload);
  }
  SendMail(payload: any) {
    return this.http.post(UrlApi + '/Users/SendMail', payload);
  }
  RefreshToken(payload: any) {
    return this.http.post(UrlApi + '/Users/RefreshToken', payload);
  }
  UpdateAccessToken(payload: any) {
    return this.http.post(UrlApi + '/Users/UpdateAccessToken', payload);
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
    // this.authService.signOut();
    this.ClearCookie();
    this.ClearLocalStorage();
    this.router.navigate(['/login'])
  }
}
