import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostVolunteeringActivityComponent } from './post-volunteering-activity.component';

describe('PostVolunteeringActivityComponent', () => {
  let component: PostVolunteeringActivityComponent;
  let fixture: ComponentFixture<PostVolunteeringActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PostVolunteeringActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PostVolunteeringActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
