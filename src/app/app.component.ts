import {Component} from '@angular/core';
import {FormControl} from "@angular/forms";
import {AuthenticationService} from "./_services/authentication/authentication.service";
import {Router} from "@angular/router";
import {User} from "./_models/user.model";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent {
    title = 'angular-robo-pass';

    searchInput: FormControl;
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        // Set the defaults
        this.searchInput = new FormControl('');
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}
