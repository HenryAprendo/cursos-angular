import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MyValidators } from './../../../util/validators'

@Component({
  selector: 'app-basic-valid',
  templateUrl: './basic-valid.component.html',
  styleUrls: ['./basic-valid.component.scss']
})
export class BasicValidComponent implements OnInit {

  nameField = new FormControl('', [ Validators.required, Validators.maxLength(10), MyValidators.forbiddenNameValidator(/bob/i)]);

  constructor(){ }

  ngOnInit(): void {

  }

  getValueName() {
    console.log(this.nameField.value);
  }

  get isNameFieldValid() {
    return this.nameField.touched && this.nameField.valid;
  }

  get isNameFieldInvalid() {
    return this.nameField.touched && this.nameField.invalid;
  }

}
