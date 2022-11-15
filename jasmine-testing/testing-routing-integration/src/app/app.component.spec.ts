import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { queryAllByDirective, RouterLinkDirectiveStub }  from './../testing';
import { Component } from '@angular/core';


@Component({
  selector: 'app-banner'
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
class BannerComponentStub {

}

@Component({
  selector: 'app-footer'
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
class FooterComponentStub {

}

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent,
        RouterLinkDirectiveStub,
        FooterComponentStub,
        BannerComponentStub
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should there are 7 routerLink', () => {
    const links = queryAllByDirective(fixture, RouterLinkDirectiveStub);
    expect(links.length).toEqual(7);
  });

  it('should there are 7 routerLink with match router', () => {
    const links = queryAllByDirective(fixture, RouterLinkDirectiveStub);
    const routerLink = links.map(link => link.injector.get(RouterLinkDirectiveStub));

    expect(links.length).toEqual(7);
    expect(routerLink[0].linkParams).toEqual('/');
    expect(routerLink[1].linkParams).toEqual('/auth/register');
  });

});














