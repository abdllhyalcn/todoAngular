import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, Router, RouterStateSnapshot } from "@angular/router";
import { AuthService } from "./services/auth.service";

@Injectable()
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService,
     private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let logged:boolean = this.authService.getUser()!=null?true:false;

    if (logged) {
      return true;
    }
    this.router.navigate([""]);
    return false;
  }
}

@Injectable()
export class HomeGuard implements CanActivate {
  constructor(private authService: AuthService,
     private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let logged:boolean = this.authService.getUser()!=null?true:false;

    if (logged) {
      return false;
    }
    this.router.navigate(["home"]);
    return true;
  }
}