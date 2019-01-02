import { Injectable } from '@angular/core';
import {Observable} from "rxjs/internal/Observable";
import {User} from "../../_models/user.model";
import {environment} from "../../../environments/environment";
import {BehaviorSubject} from "rxjs/internal/BehaviorSubject";
import {HttpClient, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";
import {Router} from "@angular/router";

@Injectable()
export class AuthenticationService {

    CONFIG = environment;
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;
    private loggedIn = false;

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        this.loggedIn = !!localStorage.getItem('token');
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string) {
        const url = this.CONFIG.api.serverUrl + '/login';
        return this.http.post<any>(url, { username, password })
            .pipe(map(user => {
                console.log(user);
                // login successful if there's a jwt token in the response
                if (user && user.success) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    localStorage.setItem('token', user.success.token.toString());
                    this.currentUserSubject.next(user);
                    this.loggedIn = true;
                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        localStorage.removeItem('token');
        this.currentUserSubject.next(null);
        this.loggedIn = false;
        this.router.navigate(['/login']);
    }

    isLoggedIn() {
        return this.loggedIn;
    }
}
