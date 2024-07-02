import {ComponentFixture, TestBed, waitForAsync} from '@angular/core/testing';

import {EntranceWrapperComponent} from './entrance-wrapper.component';


describe('EntranceWrapperComponent', () => {
  let component: EntranceWrapperComponent;
  let fixture: ComponentFixture<EntranceWrapperComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EntranceWrapperComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(EntranceWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render ion-grid', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('ion-grid')).toBeTruthy();
  });

  it('should render ion-card', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('ion-card')).toBeTruthy();
  });

  it('should render ion-avatar', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('ion-avatar')).toBeTruthy();
  });

  it('should render ion-icon', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('ion-icon')).toBeTruthy();
  });

});
