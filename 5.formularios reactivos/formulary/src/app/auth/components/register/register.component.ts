import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { MyValidators } from './../../../util/validators'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form!: FormGroup;

  showCompanyName = true;

  constructor(private formBuilder:FormBuilder) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.typeField?.valueChanges
    .subscribe( value => {
      console.log(value);
      if(value === 'company') {
        this.companyNameField?.setValidators([Validators.required]);
        this.showCompanyName = true;
      }
      else {
        this.companyNameField?.setValidators(null);
        this.showCompanyName = false;
      }
      this.companyNameField?.updateValueAndValidity();
    });
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(6), MyValidators.validPassword]],
      confirmPassword: ['',[Validators.required]],
      type: ['company', [Validators.required]],
      companyName: ['', [Validators.required]]
    },
    {
      // validación grupal entre password y confirmPassword en un objeto aparte
      validators: MyValidators.matchPasswords
    })
  }


  get typeField() {
    return this.form.get('type');
  }

  get companyNameField() {
    return this.form.get('companyName');
  }


  get passwordField() {
    return this.form.get('password');
  }

  get isNamePasswordInvalid() {
    return this.passwordField?.touched && this.passwordField.invalid;
  }

  get isNamePasswordValid() {
    return this.passwordField?.touched && this.passwordField.valid;
  }

}













