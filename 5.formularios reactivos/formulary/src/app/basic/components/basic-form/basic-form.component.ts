import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss']
})
export class BasicFormComponent implements OnInit {

  // Cada input puede ser o no inicializado
  nameField = new FormControl('');

  emailField = new FormControl();

  phoneField = new FormControl();

  colorField = new FormControl();

  dateField = new FormControl();

  ageField = new FormControl(12);

  categoryField = new FormControl('category-3');

  tagField = new FormControl();

  agreeField = new FormControl(false);

  preferenceField = new FormControl(false);

  genderField = new FormControl('');

  zoneField = new FormControl();

  constructor() { }

  ngOnInit(): void {
    // obteniene el valor de forma reactiva escuchando siempre el value del input
    this.nameField.valueChanges
    .subscribe( value => console.log(value));
  }

  getNameValue() {
    console.log(this.nameField.value);
  }

}






