import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormSubgroupComponent } from './form-subgroup.component';

describe('FormSubgroupComponent', () => {
  let component: FormSubgroupComponent;
  let fixture: ComponentFixture<FormSubgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormSubgroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormSubgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
