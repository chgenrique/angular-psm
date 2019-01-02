import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PassAccountComponent} from "./pass-account/pass-account.component";
import {PassCategoryComponent} from "./pass-category/pass-category.component";
import {PassDashboardComponent} from "./pass-dashboard/pass-dashboard.component";
import {AuthGuard} from "./_services/authentication/auth.guard";
import {LoginComponent} from "./login/login.component";

const routes: Routes = [
    {path: '', component: PassDashboardComponent, canActivate: [AuthGuard]},
    {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'dashboard',
        component: PassDashboardComponent,
        canActivate: [AuthGuard]},
    {
        path: 'pass-category',
        component: PassCategoryComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'pass-account',
        component: PassAccountComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'register',
        component: PassCategoryComponent,
        canActivate: [AuthGuard]
    },
    // otherwise redirect to Dashboard
    {path: '**', redirectTo: 'dashboard'}

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
