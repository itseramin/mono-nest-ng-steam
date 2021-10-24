import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequirementsnotmetComponent } from './requirementsnotmet.component';

describe('SellComponent', () => {
  let component: RequirementsnotmetComponent;
  let fixture: ComponentFixture<RequirementsnotmetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequirementsnotmetComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RequirementsnotmetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
