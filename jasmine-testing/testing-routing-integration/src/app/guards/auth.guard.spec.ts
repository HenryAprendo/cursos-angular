import { TestBed } from "@angular/core/testing";
import { AuthGuard } from './auth.guard';
import { AuthService } from './../services/auth.service';
import { TokenService } from './../services/token.service';
import { Router } from "@angular/router";
import { fakeActivatedRouteSnapshot, fakeParamsMap, fakeRouterStateSnapshot, mockObservable } from './../../testing';
import { generateOneUser } from "../models/user.mock";

describe('Test AuthService', () => {
  let authGuard: AuthGuard;
  let tokenService: jasmine.SpyObj<TokenService>;
  let authService: jasmine.SpyObj<AuthService>;
  let route: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const tokenServiceSpy = jasmine.createSpyObj('TokenService', ['getToken']);
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['getUser']);
    const routerSpy = jasmine.createSpyObj('Router', ['navigate']);

    TestBed.configureTestingModule({
      providers: [
        AuthGuard,
        { provide: TokenService, useValue: tokenServiceSpy },
        { provide: AuthService, useValue: authServiceSpy },
        { provide: Router, useValue: routerSpy }

      ]
    });

    authGuard = TestBed.inject(AuthGuard);
    tokenService = TestBed.inject(TokenService) as jasmine.SpyObj<TokenService>;
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    route = TestBed.inject(Router) as jasmine.SpyObj<Router>;

  });

  it('should be created', () => {
    expect(authGuard).toBeTruthy();
  });

  it('should return true with user session', (doneFn) => {

    const mockUser = generateOneUser();
    authService.getUser.and.returnValue(mockObservable(mockUser));

    const activatedRoute = fakeActivatedRouteSnapshot({
      // params: {
      //   idProduct: '55'
      // },
      // paramMap: fakeParamsMap({ idProduct: '55' })
    });
    const routerState = fakeRouterStateSnapshot({});

    authGuard.canActivate(activatedRoute, routerState)
      .subscribe(rta => {
        expect(rta).toBeTrue();
        doneFn();
      });
  });

  it('should return false without session', (doneFn) => {

    authService.getUser.and.returnValue(mockObservable(null));
    route.navigate.and.callThrough();

    const activatedRoute = fakeActivatedRouteSnapshot({
      // params: {
      //   idProduct: '55'
      // },
      // paramMap: fakeParamsMap({ idProduct: '55' })
    });
    const routerState = fakeRouterStateSnapshot({});

    authGuard.canActivate(activatedRoute, routerState)
      .subscribe(rta => {
        expect(rta).toBeFalse();
        expect(route.navigate).toHaveBeenCalledWith(['/']);
        doneFn();
      });
  });

  it('should return with idProduct Params', (doneFn) => {

    authService.getUser.and.returnValue(mockObservable(null));
    route.navigate.and.callThrough();

    const activatedRoute = fakeActivatedRouteSnapshot({
      // params: {
      //   idProduct: '55'
      // },
      // paramMap: fakeParamsMap({ idProduct: '55' })
    });
    const routerState = fakeRouterStateSnapshot({});

    authGuard.canActivate(activatedRoute, routerState)
      .subscribe(rta => {
        expect(rta).toBeFalse();
        expect(route.navigate).toHaveBeenCalledWith(['/']);
        doneFn();
      });
  });


});















