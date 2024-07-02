import {TestBed} from '@angular/core/testing';
import {HttpTestingController, provideHttpClientTesting} from '@angular/common/http/testing';
import {AuthService} from './auth.service';
import {provideHttpClient} from "@angular/common/http";
import {TestScheduler} from "rxjs/internal/testing/TestScheduler";
import {environment} from "../../environments/environment.mock";

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  let testScheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        AuthService,
        {provide: 'environment', useValue: environment} // Provide the mock environment
      ]
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
    testScheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check if user is logged in correctly', () => {
    localStorage.removeItem('token'); // Simulate logged out state
    expect(service.isLoggedIn()).toBeFalsy();

    localStorage.setItem('token', 'mock-token'); // Simulate logged in state
    expect(service.isLoggedIn()).toBeTruthy();
  });

  it('should return false if user is not logged in', () => {
    spyOn(service, 'isLoggedIn').and.returnValue(false);

    testScheduler.run(({expectObservable}) => {
      const result$ = service.validateToken();
      expectObservable(result$).toBe('(a|)', {a: false});
    });
  });

  it('should return true if token is valid', () => {
    spyOn(service, 'isLoggedIn').and.returnValue(true);
    localStorage.setItem('token', 'valid_token');

    const mockResponse = {isValid: true};
    const result$ = service.validateToken();

    result$.subscribe((isValid) => {
      expect(isValid).toBe(true);
    });

    const request = httpMock.expectOne(environment.validateTokenUrl);
    request.flush(mockResponse);
  });

  it('should return false if token is invalid', () => {
    spyOn(service, 'isLoggedIn').and.returnValue(true);
    localStorage.setItem('token', 'invalid_token');

    const mockResponse = {isValid: false};
    const result$ = service.validateToken();

    result$.subscribe((isValid) => {
      expect(isValid).toBe(false);
    });

    const request = httpMock.expectOne(environment.validateTokenUrl);
    request.flush(mockResponse);

  });

  it('should return false and logout if API call fails', () => {
    spyOn(service, 'isLoggedIn').and.returnValue(true);
    localStorage.setItem('token', 'valid_token');
    spyOn(service, 'logout');

    const result$ = service.validateToken();

    result$.subscribe((isValid) => {
      expect(isValid).toBe(false);
    });

    const request = httpMock.expectOne(environment.validateTokenUrl);
    request.flush('API error', {status: 500, statusText: 'Internal Server Error'});

    expect(service.logout).toHaveBeenCalled();
  });
});
