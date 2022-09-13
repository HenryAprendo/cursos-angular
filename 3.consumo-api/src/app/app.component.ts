import { Component } from '@angular/core';
import { CreateUserDTO } from './models/user.model';
import { AuthService } from './services/auth.service';
import { UsersService } from './services/users.service';
import { FilesService } from './services/files.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  token = '';
  imgRta = '';

  constructor(
    private authService: AuthService,
    private UsersService: UsersService,
    private filesService: FilesService
  ) { }

  createUser() {
    //El nuevo usuario deberia venir de una interfaz de formulario ngmodel
    const newUser: CreateUserDTO = {
      name: 'salome',
      email: 'salome@gmail.com',
      password: 'salome123'
    }
    this.UsersService.create(newUser)
    .subscribe( rta => {
      console.log(rta);
    });
  }


  login(){
    this.authService.login('salome@gmail.com', 'salome123')
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































