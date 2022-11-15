import { DebugElement } from "@angular/core";
import { ComponentFixture } from "@angular/core/testing";
import { query, queryById } from './finders';

export function setInputValue<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  value: string,
  withTestid: boolean = false
) {

  let debugElement: DebugElement;
  if(withTestid){
    debugElement = queryById(fixture, selector);
  }
  else {
    debugElement = query(fixture, selector);
  }

  const inputEL: HTMLInputElement = debugElement.nativeElement;
  inputEL.value = value;
  inputEL.dispatchEvent(new Event('input'));
  inputEL.dispatchEvent(new Event('blur'));

}


export function setCheckboxValue<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  value: boolean,
  withTestid: boolean = false
) {

  let debugElement: DebugElement;
  if(withTestid){
    debugElement = queryById(fixture, selector);
  }
  else {
    debugElement = query(fixture, selector);
  }

  const inputEL: HTMLInputElement = debugElement.nativeElement;
  inputEL.checked = value;
  inputEL.dispatchEvent(new Event('change'));
  inputEL.dispatchEvent(new Event('blur'));

}





