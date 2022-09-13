import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OnExit } from 'src/app/guards/exit.guard';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnExit {

  constructor() { }

  onExit(): boolean | Observable<boolean> | Promise<boolean> {
    const rta = confirm('Estás seguro que deseas salir de la página');
    return rta;
  }


}
