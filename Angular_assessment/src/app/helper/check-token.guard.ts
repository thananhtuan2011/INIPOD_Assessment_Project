import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '@app/auth/service/authentication.service';
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class WebAppCheckTokenGuard implements CanActivate {

    constructor(
        private authSerivice: AuthenticationService,
        private router: Router
    ) { }

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean | any {

        const joyToken = this.authSerivice.getAccessToken();

        if (!joyToken) {
            this.router.navigate([`/auth/login`])
            return false;
        }
        return true;
    }
}
