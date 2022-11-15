import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';
import { MyValidators } from './../util/validators';

@Directive({
  selector: '[appForbiddenName]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ForbiddenValidatorDirective,
      multi: true
    }
  ]
})
export class ForbiddenValidatorDirective implements Validator {

  @Input('appForbiddenName') forbiddenName = '';

  constructor() { }

  validate(control: AbstractControl ): ValidationErrors | null {
    return this.forbiddenName ? MyValidators.forbiddenNameValidator(new RegExp(this.forbiddenName,'i'))(control) : null
  }


}
