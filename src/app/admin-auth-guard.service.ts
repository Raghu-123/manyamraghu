import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuardService implements CanActivate {

  constructor(
    private auth: AuthService,
    private userSerice: UserService) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    return this.auth.appUser$.pipe(map(appUser => appUser.isAdmin));
    }
}
