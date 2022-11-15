
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class MyValidators {


  static forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control:AbstractControl): ValidationErrors | null => {
      const forbidden = nameRe.test(control.value);
      return forbidden ? {forbiddenName: { value: control.value}} : null
    }
  }

  static isPriceValid(control: AbstractControl) {
    const value = control.value;
    if(value > 10000) {
      return { price_invalid: true};
    }
    return null;
  }

  static validPassword(control: AbstractControl) {
    // recibimos el control especifico por ser validación unica
    const value = control.value;
    if(!containsNumber(value)) {
      return { invalid_password: true};
    }
    return null;

  }

  static matchPasswords(control:AbstractControl) {
    // recibimos todo el formulario por se un validación grupal
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if(password === confirmPassword) {
      return null
    }
    return {match_password: true}
  }

}

function containsNumber(value: string) {
  return value.split('').find(v => isNumber(v)) !== undefined;
}

function isNumber(value:string) {
  return !isNaN(parseInt(value,10))
}
