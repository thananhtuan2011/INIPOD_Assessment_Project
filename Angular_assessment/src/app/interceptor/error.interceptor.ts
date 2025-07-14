import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { catchError, concatMap, delay, filter, retryWhen, switchMap, take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { LayoutUtilsService, MessageType } from '@app/layout/services/layout-utils.service';
import { AuthenticationService } from '@app/auth/service/authentication.service';

export const retryCount = 1;
export const retryWaitMilliSeconds = 1000;
let isRefreshing = false;
const refreshTokenSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private authenticationService: AuthenticationService,
    private router: Router,
    private layoutUtilsService: LayoutUtilsService,
  ) { }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request)
      .pipe(
        retryWhen((error) =>
          error.pipe(
            concatMap((error, count) => {
              if (
                count <= retryCount &&
                (error.status === 0 || (error.status === 400 && !error.error))
              ) {
                return of(error);
              }
              return throwError(() => error);
            }),
            delay(retryWaitMilliSeconds)
          )
        )
      )
      .pipe(
        catchError(err => {
          if (err.status === 401) {
            return this.handle401Error(request, next);
          }

          const error = JSON.stringify(err);
          let erreur = err?.error?.error ? err?.error?.error : err?.error;
          if (erreur instanceof Blob) {
            const reader = new FileReader();
            reader.onload = () => {
              erreur = reader.result;

              this.layoutUtilsService.showInfo('An error has occurred on the server. The technical team has been notified!', MessageType.Read, 3000, true, false, 3000, 'end', 1);
            };
            reader.readAsText(erreur);
          } else {
            if (err.status === 504) {
              this.layoutUtilsService.showInfo('An error has occurred on the server. The technical team has been notified!', MessageType.Read, 3000, true, false, 3000, 'end', 1);
            } else if (environment.production && err.status === 500) {
              this.layoutUtilsService.showInfo('An error has occurred on the server. The technical team has been notified!', MessageType.Read, 3000, true, false, 3000, 'end', 1);
            } else if (environment.production && err.status === 400) {
              this.layoutUtilsService.showInfo('An error has occurred on the server. The technical team has been notified!', MessageType.Read, 3000, true, false, 3000, 'end', 1);
            } else if (environment.production && err.status === 408) {
              this.layoutUtilsService.showInfo('An error has occurred on the server. The technical team has been notified!', MessageType.Read, 3000, true, false, 3000, 'end', 1);
            } else if (err.status === 403) {
              this.layoutUtilsService.showInfo('An error has occurred on the server. The technical team has been notified!', MessageType.Read, 3000, true, false, 3000, 'end', 1);
            } else if (
              environment.production &&
              err.status !== 0 &&
              err.status !== 401
            ) {
              this.layoutUtilsService.showInfo('An error has occurred on the server. The technical team has been notified!', MessageType.Read, 3000, true, false, 3000, 'end', 1);
            } else if (!environment.production) {
              this.layoutUtilsService.showInfo('An error has occurred on the server. The technical team has been notified!', MessageType.Read, 3000, true, false, 3000, 'end', 1);
            }
          }
          return throwError(() => error);
        })
      );
  }

  private handle401Error(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<any> {
    if (isRefreshing === false) {
      isRefreshing = true;
      refreshTokenSubject.next(null);

      // Tente de rafraîchir le token
      return this.authenticationService.refreshAccessToken({ refreshToken: this.authenticationService.getRefreshToken() }).pipe(
        switchMap((response: any) => {
          isRefreshing = false;

          // Enregistrer les nouveaux tokens
          this.authenticationService.saveToken_cookie(response);

          // Émettre le nouveau accessToken
          refreshTokenSubject.next(response);

          // Rejouer la requête initiale avec le nouveau token
          return next.handle(this.addToken(request, response));
        }),
        catchError((error) => {
          isRefreshing = false;

          // Si la tentative de refresh échoue avec un 401
          if (error.status === 401) {
            // Déconnexion de l'utilisateur
            this.authenticationService.logout();

            // Redirection vers la page de login
            this.router.navigate(['/auth/login'], { queryParams: { sessionExpired: true } });

            return throwError(() => new Error('Session expired. Please log in again.'));
          }

          return throwError(() => error);
        })
      );
    } else {
      // Si une requête est déjà en cours de rafraîchissement
      return refreshTokenSubject.pipe(
        filter(token => token != null), // Attend que le token soit mis à jour
        take(1),
        switchMap(token => next.handle(this.addToken(request, token!)))
      );
    }
  }

  private addToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
  }
}
