import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { TokenService } from './../services/token.service';
import { AuthService } from './../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private tokenService: TokenService,
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    // const token = this.tokenService.getToken();
    // if (!token) {
    //   this.router.navigate(['/home']);
    //   return false;
    // }
    // return true;

    //puedo enviar el mismo parametro de dos formas y obtenerlo de manera distinta.
    // let params =  route.params['idProduct'];

    // let paramMap = route.paramMap.get('idProduct');
    // let name = route.paramMap.has('idProduct');

    return this.authService.getUser()
    .pipe(
      map(user => {
        if(!user) {
          this.router.navigate(['/']);
          return false;
        }
        return true;
      })
    )
  }

}






