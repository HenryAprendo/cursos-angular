import { Component, OnInit } from '@angular/core';
import { CreateUserDTO } from './models/user.model';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';
import { TokenService } from './services/token.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  token = '';
  imgRta = '';

  constructor(
    private authService: AuthService,
    private tokenService: TokenService,
    private usersService: UsersService,
    private filesService: FilesService
  ) { }

  ngOnInit(){
    const token = this.tokenService.getToken();
    if(token) {
      this.authService.getProfile()
      .subscribe(() => console.log('Recupera el token, para mantener la sesión, y activar un estado global'));
    }
  }

  createUser() {
    this.usersService.create({
      name: 'Salome',
      email: 'salome@mail.com',
      password: '1212',
      role:'customer'
    })
    .subscribe(rta => {
      console.log(rta);
    });
  }


  login(){
    this.authService.login('salome@mail.com', '1212')
    .subscribe( rta => {
      console.log(rta.access_token)
      this.token = rta.access_token;
    });
  }

  getProfile() {
    this.authService.getProfile()
    .subscribe( profile => {
      console.log(profile);
    });
  }

  downloadPdf(){
    this.filesService.getFile('my.pdf', 'https://young-sands-07814.herokuapp.com/api/files/dummy.pdf','application/pdf')
    .subscribe()
  }

  onUpload(event: Event) {
    const element = event.target as HTMLInputElement;
    const file = element.files?.item(0);
    if(file) {
      this.filesService.uploadFile(file)
      .subscribe( rta => {
        this.imgRta = rta.location;
        console.log(rta.location)
      })
    }
  }

}































