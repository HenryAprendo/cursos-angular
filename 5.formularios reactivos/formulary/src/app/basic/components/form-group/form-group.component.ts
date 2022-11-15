import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-group',
  templateUrl: './form-group.component.html',
  styleUrls: ['./form-group.component.scss']
})
export class FormGroupComponent implements OnInit {

  form!:FormGroup;

  // form = new FormGroup({
  //   name: new FormControl('',[Validators.required, Validators.maxLength(10)]),
  //   email: new FormControl(''),
  //   phone: new FormControl(''),
  //   color: new FormControl(''),
  //   date: new FormControl(''),
  //   age: new FormControl(''),
  //   category: new FormControl('category-3'),
  //   tag: new FormControl(''),
  //   agree: new FormControl(false),
  //   gender: new FormControl(''),
  //   zone: new FormControl('')

  // })

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.builderForm();
  }

  ngOnInit(): void {
    //Escuchando un campo en particular
    this.nameField?.valueChanges.subscribe(value => console.log(value))

  // Escuchando el formulario
    this.form.valueChanges.subscribe(value => console.log(value));
  }

  private builderForm() {
    this.form = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(10), Validators.pattern(/^[a-zA-Z ]+$/)]],
      email:['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      color: ['#000000'],
      date: [''],
      age: [18,[Validators.required, Validators.min(18), Validators.max(100)]],
      category: [''],
      tag: [''],
      agree: [false,[Validators.requiredTrue]],
      gender: [''],
      zone: ['']
    })
  }

  save(e:Event) {
    if(this.form.valid) {
      console.log(this.form.value);
    }
    else {
      this.form.markAllAsTouched();
    }
  }

  get nameField() {
    return this.form.get('name');
  }

  // getters de validación
  get isNameFieldInvalid() {
    return this.nameField?.touched && this.nameField.invalid;
  }

  get isNameFieldValid() {
    return this.nameField?.touched && this.nameField.valid;
  }

  //getters de valores
  get emailField() {
    return this.form.get('email');
  }

  get phoneField() {
    return this.form.get('phone');
  }

  get colorField() {
    return this.form.get('color');
  }

  get dateField() {
    return this.form.get('date');
  }

  get ageField() {
    return this.form.get('age');
  }

  get categoryField() {
    return this.form.get('category');
  }

  get tagField() {
    return this.form.get('tag');
  }

  get agreeField() {
    return this.form.get('agree');
  }

  get genderField() {
    return this.form.get('gender');
  }

  get zoneField() {
    return this.form.get('zone');
  }
}


















