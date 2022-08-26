import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesvolanteeringactivitiesComponent } from './companiesvolanteeringactivities.component';

describe('CompaniesvolanteeringactivitiesComponent', () => {
  let component: CompaniesvolanteeringactivitiesComponent;
  let fixture: ComponentFixture<CompaniesvolanteeringactivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompaniesvolanteeringactivitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompaniesvolanteeringactivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
