import { ComponentFixture } from "@angular/core/testing";
import { query, queryById } from './finders';

export function clickEvent<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  withTestid: boolean = false,
  event: unknown = null
) {

  let element;
  if(withTestid){
    element = queryById(fixture, selector);
  }
  else {
    element = query(fixture, selector);
  }
  element.triggerEventHandler('click', event);  //aqui despertamos o lanzamos los eventos de angular adjuntos a este elemento
}


export function clickElement<T>(
  fixture: ComponentFixture<T>,
  selector: string,
  withTestid: boolean = false
) {

  let debugElement;
  if(withTestid){
    debugElement = queryById(fixture, selector);
  }
  else {
    debugElement = query(fixture, selector);
  }

  const element: HTMLElement = debugElement.nativeElement;
  element.click();      //aqui si hacemos click al elemento nativo html por ejemplo un boton submit

}











