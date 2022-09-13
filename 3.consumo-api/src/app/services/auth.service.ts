import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Auth } from '../models/auth.model';
import { User } from '../models/user.model';
import { switchMap, tap } from 'rxjs';
import { TokenService } from '../services/token.service'


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = `${environment.API_URL}/api/auth`;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService
  ) { }

  login(email:string, password:string){
    return this.http.post<Auth>(`${this.apiUrl}/login`,{ email, password} )
    .pipe(
      tap( response => this.tokenService.saveToken(response.access_token))
    )
  }

  getProfile() {
    // let headers = new HttpHeaders();
    // headers.set('authorization', `Bearer ${token}`);
    return this.http.get<User>(`${this.apiUrl}/profile`, {
      // headers: {
      //   authorization: `Bearer ${token}`
      // }
    });
  }

  loginAndGet(email:string, password:string) {
    return this.login(email,password)
    .pipe(
      switchMap( () => this.getProfile())
    )
  }

}









