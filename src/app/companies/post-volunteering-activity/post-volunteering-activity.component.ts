import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { activity } from 'src/app/services/activities';
import { ActivitiesService } from 'src/app/services/activities.service';

@Component({
  selector: 'app-post-volunteering-activity',
  templateUrl: './post-volunteering-activity.component.html',
  styleUrls: ['./post-volunteering-activity.component.css']
})
export class PostVolunteeringActivityComponent implements OnInit {
  form=this.fb.group({
    Name:this.fb.control('',Validators.required),
    Description:this.fb.control('',Validators.required),
    SkillsRequired:this.fb.control('',Validators.required),
    StartDate:this.fb.control('',Validators.required),
    EndDate:this.fb.control('',Validators.required),
    Numberoftechnologistsrequired:this.fb.control('',Validators.required),
  })
  constructor(private fb:FormBuilder,private activityService:ActivitiesService,private router:Router ) { }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log(this.form);
    console.log(this.form.value);
    this.activityService.addActivity(this.form.value as unknown as activity)
    this.router.navigate(['/companies/companyActivities'])
  }
}
