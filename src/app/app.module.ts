import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LayoutModule} from '@angular/cdk/layout';
import {
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatGridListModule,
    MatCardModule,
    MatSelectModule,
    MatMenuModule,
    MatDialogModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatProgressBarModule, MatAutocompleteModule
} from '@angular/material';
import {PassCategoryComponent} from './pass-category/pass-category.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MainNavComponent} from './main-nav/main-nav.component';
import {PassDashboardComponent} from './pass-dashboard/pass-dashboard.component';
import {PassAccountComponent} from './pass-account/pass-account.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {RoboPassService} from "./_services/robo-pass.service";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {LoginComponent} from './login/login.component';
import {ErrorInterceptor, fakeBackendProvider, JwtInterceptor} from "./_helpers";
import {AuthenticationService} from "./_services/authentication/authentication.service";
import {AuthGuard} from "./_services/authentication/auth.guard";

@NgModule({
    declarations: [
        AppComponent,
        PassCategoryComponent,
        MainNavComponent,
        PassDashboardComponent,
        PassAccountComponent,
        LoginComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule, // here call routing
        LayoutModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatGridListModule,
        MatCardModule,
        MatSelectModule,
        MatMenuModule,
        MatFormFieldModule,
        MatInputModule,
        MatRippleModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
        MatAutocompleteModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CommonModule,
        MatDialogModule,
        MatCheckboxModule,
    ],
    providers: [
        RoboPassService,
        AuthenticationService,
        AuthGuard,
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
        // provider used to create fake backend
        fakeBackendProvider
    ],

    bootstrap: [AppComponent]
})
export class AppModule {
}
