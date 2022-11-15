import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { ProductDetailComponent } from './product-detail.component';
import { ProductsService } from './../../../services/product.service';
import { generateOneProduct } from './../../../models/product.mock';

import { ActivatedRoute } from '@angular/router';
import { ActivatedRouteStub, asyncData, asyncError, getText, mockObservable } from './../../../../testing';
import { Location } from '@angular/common';

describe('ProductDetailComponent', () => {
  let component: ProductDetailComponent;
  let fixture: ComponentFixture<ProductDetailComponent>;
  let route: ActivatedRouteStub;
  let productsService: jasmine.SpyObj<ProductsService>;
  let location: jasmine.SpyObj<Location>;

  beforeEach(async () => {
    const routeStub = new ActivatedRouteStub();
    const productsServiceSpy = jasmine.createSpyObj('ProductsService',['getOne']);
    const locationSpy = jasmine.createSpyObj('Location', ['back']);

    await TestBed.configureTestingModule({
      declarations: [ ProductDetailComponent ],
      providers: [
        { provide: ActivatedRoute, useValue: routeStub },
        { provide: ProductsService, useValue: productsServiceSpy },
        { provide: Location, useValue: locationSpy },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    route = TestBed.inject(ActivatedRoute) as unknown as ActivatedRouteStub;
    productsService = TestBed.inject(ProductsService) as jasmine.SpyObj<ProductsService>;
    location = TestBed.inject(Location) as jasmine.SpyObj<Location>;

  });

  it('should create', () => {
    const productId = '1';
    route.setParamMap({ id: productId });

    const productMock = {
      ...generateOneProduct(),
      id: productId
    }
    productsService.getOne.and.returnValue(mockObservable(productMock));

    fixture.detectChanges();
    expect(component).toBeTruthy();
  });

  it('should show the product in the view', () => {
    const productId = '2';
    route.setParamMap({ id: productId });

    const productMock = {
      ...generateOneProduct(),
      id: productId
    }
    productsService.getOne.and.returnValue(mockObservable(productMock));

    fixture.detectChanges();

    const textTitle = getText(fixture, 'title');
    const textPrice = getText(fixture, 'price');

    expect(textTitle).toContain(productMock.title);
    expect(textPrice).toContain(productMock.price);
    expect(productsService.getOne).toHaveBeenCalledWith(productId);

  });

  it('should go to back without id params', () => {

    route.setParamMap({});
    location.back.and.callThrough();

    fixture.detectChanges();

    expect(location.back).toHaveBeenCalled();

  });

  describe('Test for getProductDetail', () => {
    it('should change the state "loading a success" with a id params', fakeAsync(() => {

      const productId = '3';
      route.setParamMap({id: productId});

      const productMock = {
        ...generateOneProduct(),
        id: productId
      }

      productsService.getOne.and.returnValue(asyncData(productMock));
      fixture.detectChanges();

      expect(component.status).toEqual('loading');

      tick();
      fixture.detectChanges();

      expect(component.status).toEqual('success');

    }));

    it('should change the state "loading => error" ', fakeAsync(() => {

      const productId = '3';
      route.setParamMap({id: productId});

      const productMock = 'error';

      productsService.getOne.and.returnValue(asyncError(productMock));
      fixture.detectChanges();

      expect(component.status).toEqual('loading');

      tick();
      fixture.detectChanges();

      expect(component.status).toEqual('error');

    }));


    it('should typeCustomer be ""custome', () => {
      const productId = '4';
      route.setParamMap({id: productId});
      route.setQueryParamMap({type: 'customer'});

      const productMock = {
        ...generateOneProduct(),
        id: productId
      }

      productsService.getOne.and.returnValue(mockObservable(productMock));
      fixture.detectChanges();

      expect(component.typeCustomer).toContain('customer')

    });
  });


});

























