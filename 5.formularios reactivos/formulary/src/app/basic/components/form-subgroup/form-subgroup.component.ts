import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-subgroup',
  templateUrl: './form-subgroup.component.html',
  styleUrls: ['./form-subgroup.component.scss']
})
export class FormSubgroupComponent implements OnInit {

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
        name: ['', Validators.required],
        last: ['', Validators.required]
      })

    })
  }

  getValue() {
    console.log(this.form.value);
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


}







