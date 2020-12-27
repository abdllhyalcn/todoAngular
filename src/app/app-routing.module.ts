import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { HomeGuard, LoginGuard } from './LoginGuard';

const routes: Routes = [
  { path:'', redirectTo: 'login' , pathMatch: 'full'},
  {
    path:'login',component:LoginComponent, canActivate: [HomeGuard]
  },
  {
    path:'home',component:HomeComponent, canActivate: [LoginGuard]
  },
  {
    path:'logout',component:LogoutComponent
  },
  {
    path:'about',component:AboutComponent
  },
  {
    path:'**',component:NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
