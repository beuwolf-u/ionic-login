import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NotFoundPage} from './not-found.page';
import {NavController} from "@ionic/angular/standalone";

describe('NotFoundPage', () => {
  let component: NotFoundPage;
  let fixture: ComponentFixture<NotFoundPage>;
  let navControllerMock: NavController;

  beforeEach(() => {
    navControllerMock = jasmine.createSpyObj('NavController', ['navigateRoot']);

    TestBed.overrideProvider(NavController, {useValue: navControllerMock});

    fixture = TestBed.createComponent(NotFoundPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the component', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const label = compiled.querySelector('ion-label');
    expect(label).toBeTruthy();
    expect(label?.textContent).toContain('Page Not Found');
  });

  it('should have a button to navigate back to the home page', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const link = compiled.querySelector('ion-button');
    expect(link).toBeTruthy();
    expect(link?.textContent).toContain('Go back to home');
  });

  it('should navigate to the home page when backHome is called', () => {
    component.backHome();
    expect(navControllerMock.navigateRoot).toHaveBeenCalledWith(['/home'], {skipLocationChange: true});
  });
});
