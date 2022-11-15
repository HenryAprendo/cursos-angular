import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicValidComponent } from './basic-valid.component';

describe('BasicValidComponent', () => {
  let component: BasicValidComponent;
  let fixture: ComponentFixture<BasicValidComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BasicValidComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasicValidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
