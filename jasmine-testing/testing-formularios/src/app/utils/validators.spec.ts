import { MyValidators } from './validators';
import { FormControl, FormGroup } from '@angular/forms';
import { UsersService } from './../services/user.service';
import { mockObservable } from 'src/testing';


describe('Test for MyValidators', () => {

  describe('Test for validPassword', () => {
    it('should return null when password is rigth', () => {
      const control = new FormControl();
      control.setValue('mypassword15');

      const rta = MyValidators.validPassword(control);
      expect(rta).toBeNull();

    });

    it('should return true when password is wrong', () => {
      const control = new FormControl();
      control.setValue('mypassw');

      const rta = MyValidators.validPassword(control);
      expect(rta?.invalid_password).toBeTrue();

    });
  });

  describe('Test for matchPasswords', () => {
    it('should return null when the passwords is right', () => {

      const form = new FormGroup({
        password: new FormControl(),
        confirmPassword: new FormControl()
      })

      form.get('password')?.setValue('mypassword15');
      form.get('confirmPassword')?.setValue('mypassword15');

      const rta = MyValidators.matchPasswords(form);
      expect(rta).toBeNull();

    });

    it('should return true when the passwords is rwong', () => {

      const form = new FormGroup({
        password: new FormControl(),
        confirmPassword: new FormControl()
      })

      form.get('password')?.setValue('mypassword15');
      form.get('confirmPassword')?.setValue('mypassword1');

      const rta = MyValidators.matchPasswords(form);
      expect(rta?.match_password).toBeTrue();

    });


    it('should return a error for propertys wrong', () => {

      const form = new FormGroup({
        name: new FormControl('mypassword15'),
        last: new FormControl('mypassword15')
      })

      const fn = () => {
        MyValidators.matchPasswords(form);
      }
      expect(fn).toThrow(new Error('matchPasswords: fields not found'));

    });
  });

  describe('Test for validateEmailAsync', () => {
    it('should return null with valid mail', (doneFn) => {
      const userService: jasmine.SpyObj<UsersService> = jasmine.createSpyObj('UsersService', ['isAvailableByEmail']);
      userService.isAvailableByEmail.and.returnValue(mockObservable({ isAvailable:true }));

      const control = new FormControl('nico@mail.com');
      const validator = MyValidators.validateEmailAsync(userService);
      validator(control).subscribe( rta => {
        expect(rta).toBeNull();
        doneFn();
      });

    });
  });

});

















