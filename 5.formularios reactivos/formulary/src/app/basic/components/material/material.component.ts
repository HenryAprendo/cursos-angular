import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

interface Food {
  value: string;
  viewValue: string;
}


@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.scss']
})
export class MaterialComponent implements OnInit {

  foods: Food[] = [
    {value: 'steak-0', viewValue: 'Steak'},
    {value: 'pizza-1', viewValue: 'Pizza'},
    {value: 'tacos-2', viewValue: 'Tacos'},
  ];

  form!:FormGroup;

  constructor(
    private formBuilder:FormBuilder
  ) {
    this.getGroup();
  }

  ngOnInit(): void {
    // this.form.valueChanges.subscribe( value => console.log(value))
  }

  private getGroup() {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],

      fullName: this.formBuilder.group({
        name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30)]],
        last: ['', Validators.required]
      }),

      food: ['', Validators.required]
    })
  }

  getValue() {
    console.log(this.form.value);
  }

  get foodField() {
    return this.form.get('food');
  }

  get emailField() {
    return this.form.get('email');
  }

  get nameField() {
    return this.form.get('fullName.name');
  }

  get lastField() {
    return this.form.get('fullName')?.get('last');
  }


  get isEmailFieldInvalid() {
    return this.emailField?.touched && this.emailField.invalid
  }
  get isEmailFieldValid() {
    return this.emailField?.touched && this.emailField.valid
  }

  get isNameFieldInvalid() {
    return this.nameField?.touched && this.nameField.invalid;
  }

  get isNameFieldValid() {
    return this.nameField?.touched && this.nameField.valid;
  }

  get isLastFieldInvalid() {
    return this.lastField?.touched && this.lastField.invalid;
  }

  get isLastFieldValid() {
    return this.lastField?.touched && this.lastField.valid;
  }
}










