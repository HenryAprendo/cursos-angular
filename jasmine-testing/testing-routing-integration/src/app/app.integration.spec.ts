
import { TestBed, ComponentFixture, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router, RouterLinkWithHref } from '@angular/router';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { asyncData, clickElement, getText, mockObservable, query, queryAllByDirective } from 'src/testing';
import { routes }  from './app-routing.module';
import { AppModule } from './app.module';
import { ProductsService } from './services/product.service';
import { generateManyProducts } from './models/product.mock';
import { Product } from './models/product.model';

import { AuthService } from './../app/services/auth.service';
import { User } from './../app/models/user.model';
import { generateOneUser } from './../app/models/user.mock';


describe('app integrate test', () => {

  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let router: Router;
  let productService: jasmine.SpyObj<ProductsService>;
  let authService: jasmine.SpyObj<AuthService>;

  beforeEach( async () => {

    const productServiceSpy = jasmine.createSpyObj('ProductsService', ['getAll']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getUser']);

    await TestBed.configureTestingModule({
      imports: [
        AppModule,
        RouterTestingModule.withRoutes(routes)
      ],
      providers: [
        { provide: ProductsService, useValue: productServiceSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  });

  beforeEach(fakeAsync(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    productService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;

    //Inicializacion de la  navegación desde el servicio router que provee el module
    router = TestBed.inject(Router);
    router.initialNavigation();
    tick();   //Espera  mientras finaliza la navegación.
    fixture.detectChanges();

  }));

  it('should be created component', () => {
    expect(component).toBeTruthy();
  });

  it('should there are 7 routerLink', () => {
    const links = queryAllByDirective(fixture, RouterLinkWithHref);
    expect(links.length).toEqual(7);
  });

  it('should render OthersComponent when clicked with session', fakeAsync( () => {

    const mockProducts: Product[] = generateManyProducts(10);
    productService.getAll.and.returnValue(asyncData(mockProducts));

    const mockUser: User = generateOneUser();
    authService.getUser.and.returnValue(mockObservable(mockUser));

    clickElement(fixture,'others-link',true);
    tick();     //Espera  mientras finaliza la navegación.
    fixture.detectChanges();  //ngOnInit para cargar OthersComponent

    tick();  //resuelve el asyncData pendiente de la ejecución de  getAll
    fixture.detectChanges();

    expect(router.url)
      .withContext('verify the change path')
      .toEqual('/others')

    const element = query(fixture,'app-others');
    expect(element)
      .withContext('display the component <app-others>')
      .not.toBeNull()

    const text = getText(fixture,'products-length');
    expect(text)
      .withContext('total of product')
      .toContain(mockProducts.length)

  }))

  it('should render OthersComponent when clicked without session', fakeAsync( () => {

    authService.getUser.and.returnValue(mockObservable(null));

    clickElement(fixture,'others-link',true);
    tick();
    fixture.detectChanges();


    expect(router.url)
      .withContext('verify the change path')
      .toEqual('/')

  }))

  it('should render PicoPreviewComponent when clicked', fakeAsync( () => {
    clickElement(fixture,'pico-link',true);
    tick();
    fixture.detectChanges();

    expect(router.url)
      .withContext('verify the change path')
      .toEqual('/pico-preview');

    const element = query(fixture,'app-pico-preview');
    expect(element)
      .withContext('display the component <app-pico-preview>')
      .not.toBeNull();

  }))


});












