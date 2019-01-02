import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {AuthenticationService} from "./authentication.service";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService) {

    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const currentUser = this.authenticationService.currentUserValue;
        if (!currentUser) {
            this.router.navigate(['login']);
            return false;
        }

        return true;
    }

    canActivate2(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | boolean {

        // if (!this.authenticationService.isAutenticated()) {
        //     this.router.navigate(['login']);
        //     return false;
        // }
        // return true;

        // OR

        const currentUser = this.authenticationService.currentUserValue;
        if (currentUser) {
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
        return false;

    }
}