import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';

import { RegisterFormComponent } from './register-form.component';
import { UsersService } from './../../../services/user.service';
import { query, getText, queryById, clickEvent, setInputValue, mockObservable, asyncData, setCheckboxValue, clickElement, asyncError}  from './../../../../testing';

import { generateOneUser } from './../../../models/user.mock';
import { User } from './../../../models/user.model';

fdescribe('RegisterFormComponent', () => {
  let component: RegisterFormComponent;
  let fixture: ComponentFixture<RegisterFormComponent>;
  let userService: jasmine.SpyObj<UsersService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj(UsersService,['create','isAvailableByEmail']);

    await TestBed.configureTestingModule({
      declarations: [ RegisterFormComponent ],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: UsersService, useValue: spy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterFormComponent);
    component = fixture.componentInstance;
    userService = TestBed.inject(UsersService) as jasmine.SpyObj<UsersService>;
    userService.isAvailableByEmail.and.returnValue(mockObservable({isAvailable:true}));
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should the emailField be invalid', () => {
    component.emailField?.setValue('esto no es un correo');
    expect(component.emailField?.invalid).withContext('wrong email').toBeTruthy();

    component.emailField?.setValue('');
    expect(component.emailField?.invalid).withContext('empty').toBeTruthy();

  });

  it('should the emailField be valid', () => {
    component.emailField?.setValue('henry@gmail.com');
    expect(component.emailField?.valid).toBeTruthy();

  });


  it('should the passwordField be invalid', () => {

    component.passwordField?.setValue('');
    expect(component.passwordField?.invalid).withContext('empty').toBeTruthy();


    component.passwordField?.setValue('12333');
    expect(component.passwordField?.invalid).withContext('length minimun').toBeTruthy();


    component.passwordField?.setValue('trytytytyty');
    expect(component.passwordField?.invalid).withContext('without numbers').toBeTruthy();

    component.passwordField?.setValue('mypass87');
    expect(component.passwordField?.valid).withContext('password right').toBeTruthy();

  });

  it('should the form be invalid', () => {
    component.form.patchValue({
      name: 'henry',
      email: 'henry@gmail.com',
      password: 'hdjksk12',
      confirmPassword: 'hdjksk12',
      checkTerms: false
    })

    expect(component.form.invalid).toBeTruthy();
  });

  it('should the emailField be invalid from UI', () => {

    const inputDe = query(fixture,'input#email');
    const inputEl: HTMLInputElement = inputDe.nativeElement;
    inputEl.value = 'esto no es un correo';

    inputEl.dispatchEvent(new Event('input'));
    inputEl.dispatchEvent(new Event('blur'));
    fixture.detectChanges();

    expect(component.emailField?.invalid).withContext('wrong email').toBeTruthy();

    const errorText = getText(fixture, 'emailField-email');
    expect(errorText).toEqual("*It's not a email");


  });


  it('should the emailField be invalid from UI with setInputValue', () => {

    setInputValue(fixture,'input#email', 'esto no es un correo');

    fixture.detectChanges();

    expect(component.emailField?.invalid).withContext('wrong email').toBeTruthy();

    const errorText = getText(fixture, 'emailField-email');
    expect(errorText).toEqual("*It's not a email");

  });


  it('should send the form successFully', () => {
    component.form.patchValue({
      name: 'henry',
      email: 'henry@gmail.com',
      password: 'hdjksk12',
      confirmPassword: 'hdjksk12',
      checkTerms: true
    });

    const mockUser: User = generateOneUser();
    userService.create.and.returnValue(mockObservable(mockUser));

    component.register(new Event('submit'));

    expect(component.form.valid).toBeTruthy();
    expect(userService.create).toHaveBeenCalled();

  });

  it('should send the form successFully and change the state "loading => success" ', fakeAsync(() => {
      component.form.patchValue({
        name: 'henry',
        email: 'henry@gmail.com',
        password: 'hdjksk12',
        confirmPassword: 'hdjksk12',
        checkTerms: true
      });

      const mockUser: User = generateOneUser();
      userService.create.and.returnValue(asyncData(mockUser)); //pending

      component.register(new Event('submit'));
      expect(component.status).toEqual('loading');

      tick();
      fixture.detectChanges();

      expect(component.status).toEqual('success');
      expect(userService.create).toHaveBeenCalled();

    }));

  it('should send the form successFully from User Interface ', fakeAsync(() => {
    setInputValue(fixture,'input#name','henry');
    setInputValue(fixture,'input#email','henry@gmail.com');
    setInputValue(fixture,'input#password','hdjksk12');
    setInputValue(fixture,'input#confirmPassword','hdjksk12');
    setCheckboxValue(fixture,'input#terms',true);

    const mockUser: User = generateOneUser();
    userService.create.and.returnValue(asyncData(mockUser)); //pending

    // query(fixture,'form').triggerEventHandler('ngSubmit', new Event('submit'));      otra forma de ejecutar el ngSubmit del formulario
    clickElement(fixture,'btn-submit',true);
    expect(component.status).toEqual('loading');

    tick();
    fixture.detectChanges();

    expect(component.status).toEqual('success');
    expect(userService.create).toHaveBeenCalled();

  }));

  it('should send the form from UI but with a error in the service server  ', fakeAsync(() => {
    setInputValue(fixture,'input#name','henry');
    setInputValue(fixture,'input#email','henry@gmail.com');
    setInputValue(fixture,'input#password','hdjksk12');
    setInputValue(fixture,'input#confirmPassword','hdjksk12');
    setCheckboxValue(fixture,'input#terms',true);

    const mockUser = 'error'
    userService.create.and.returnValue(asyncError(mockUser)); //pending

    // query(fixture,'form').triggerEventHandler('ngSubmit', new Event('submit'));      otra forma de ejecutar el ngSubmit del formulario
    clickElement(fixture,'btn-submit',true);
    expect(component.status).toEqual('loading');

    tick();
    fixture.detectChanges();

    expect(component.status).toEqual('error');
    expect(userService.create).toHaveBeenCalled();

  }));


  it('should show error with an email invalid', () => {
    userService.isAvailableByEmail.and.returnValue(mockObservable({isAvailable:false}));
    setInputValue(fixture,'input#email','nico@mail.com');
    fixture.detectChanges();
    expect(component.emailField?.invalid).withContext('mail invalid').toBeTrue();
    expect(userService.isAvailableByEmail).withContext('isAvailableByEmail to call').toHaveBeenCalled();
    expect(userService.isAvailableByEmail).withContext('isAvailableByEmail to call with email').toHaveBeenCalledWith('nico@mail.com');

    const textError = getText(fixture,'emailField-not_available');
    expect(textError).withContext('show error').toEqual('The email is already registed');
  });

});




















