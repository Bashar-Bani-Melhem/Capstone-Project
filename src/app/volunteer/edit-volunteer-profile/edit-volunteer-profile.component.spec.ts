import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVolunteerProfileComponent } from './edit-volunteer-profile.component';

describe('EditVolunteerProfileComponent', () => {
  let component: EditVolunteerProfileComponent;
  let fixture: ComponentFixture<EditVolunteerProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditVolunteerProfileComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditVolunteerProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
