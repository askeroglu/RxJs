import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsReduxPageComponent } from './rxjs-redux-page.component';

describe('RxjsReduxPageComponent', () => {
  let component: RxjsReduxPageComponent;
  let fixture: ComponentFixture<RxjsReduxPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsReduxPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RxjsReduxPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
