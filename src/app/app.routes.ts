import {Routes} from '@angular/router';
import {LoginPage} from "./login/login.page";
import {authGuard} from "./guard/auth.guard";

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPage
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
    canActivate: [authGuard]
  },
  {
    path: '**',
    loadComponent: () => import('./not-found/not-found.page').then(m => m.NotFoundPage)
  },
];
