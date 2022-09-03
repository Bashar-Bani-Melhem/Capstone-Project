import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap } from 'rxjs';
import { Activity } from 'src/app/services/activities';
import { ActivitiesService } from 'src/app/services/activities.service';
import { AuthService } from 'src/app/services/auth.service';

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
    Numberoftechnologistsrequired:this.fb.control(0,Validators.required),
  })
  constructor(private fb:FormBuilder,private activityService:ActivitiesService,private router:Router,
    private auth:AuthService,
    private hot:HotToastService,
    ) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.auth.userState$.pipe(
      switchMap((data)=>{
        return this.activityService.create({
         id:data?.uid,
         Name:this.form.value.Name+'',
         Description:this.form.value.Description+'',
         SkillsRequired:this.skills, 
         StartDate:this.form.value.StartDate+'',
         EndDate:this.form.value.EndDate+'',
         Numberoftechnologistsrequired:this.form.value.Numberoftechnologistsrequired,
     })
      })
    ).pipe(this.hot.observe({
      loading: 'Creating Volunteering Activity...',
      success:'Successfully Cerated',
      error:(error)=>'This Error Happend'+error
    }),
    )
    .subscribe({
        next:()=>{
        this.navgateToProfilePage();

        }
  });
     
  }
  navgateToProfilePage(){
    this.router.navigate(['/companies/companyActivities'])
  }
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  skills: string[] = [ 'PHP',  'HTML',  'CSS'];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.skills.push( value as string);
      console.log(this.skills);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: string): void {
    const index = this.skills.indexOf(fruit);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }
}
    // console.log(this.form);
    // console.log(this.form.value);
    // this.activityService.addActivity(this.form.value as unknown as activity)
    // this.router.navigate(['/companies/companyActivities'])