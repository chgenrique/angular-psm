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
import {RouterModule, Routes} from "@angular/router";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MainNavComponent} from './main-nav/main-nav.component';
import {PassDashboardComponent} from './pass-dashboard/pass-dashboard.component';
import {PassAccountComponent} from './pass-account/pass-account.component';
import {HttpClientModule} from "@angular/common/http";
import {RoboPassService} from "./robo-pass.service";
import {CommonModule} from "@angular/common";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

const appRoutes: Routes = [
    {path: 'dashboard', component: PassCategoryComponent},
    {path: 'pass-category', component: PassCategoryComponent},
    {path: 'pass-account', component: PassAccountComponent},
];

@NgModule({
    declarations: [
        AppComponent,
        PassCategoryComponent,
        MainNavComponent,
        PassDashboardComponent,
        PassAccountComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
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
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatRippleModule,
        MatTableModule,
        MatToolbarModule,
        MatProgressSpinnerModule,
        MatPaginatorModule,
        MatSortModule,
        MatProgressBarModule,
        MatAutocompleteModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        CommonModule,
        RouterModule.forRoot(appRoutes),
        MatDialogModule,
        MatCheckboxModule,
    ],
    providers: [
        RoboPassService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
