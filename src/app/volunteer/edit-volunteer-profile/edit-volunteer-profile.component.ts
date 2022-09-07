import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { AuthService } from 'src/app/services/auth.service';
import { VolunteerService } from 'src/app/services/volunteer.service';
import { switchMap } from 'rxjs';
import { MatChipInputEvent } from '@angular/material/chips';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
@Component({
  selector: 'app-edit-volunteer-profile',
  templateUrl: './edit-volunteer-profile.component.html',
  styleUrls: ['./edit-volunteer-profile.component.css']
})
export class EditVolunteerProfileComponent implements OnInit {
  form=this.fb.group({
    fullName:this.fb.control('',Validators.required),
    phoneNumber:this.fb.control(0,Validators.required),
    city:this.fb.control('',Validators.required),
    skills:this.fb.control('',Validators.required),
    jobExperiences:this.fb.control('',Validators.required),
    Courses:this.fb.control('',Validators.required),
    availableTimes:this.fb.control('',Validators.required),
  })
  constructor(private fb:FormBuilder,private auth:AuthService,private volunteerServece:VolunteerService,
    private router:Router,
    private hot:HotToastService,) { }

  ngOnInit(): void {
  }
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  skills: string[] = [ 'PHP',  'HTML',  'CSS'];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.skills.push( value as string);
      console.log(this.skills);
    }

    event.chipInput!.clear();
  }
  remove(fruit: string): void {
    const index = this.skills.indexOf(fruit);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }
  onSubmit(){
    this.auth.userState$.pipe(
      switchMap(user=>this.volunteerServece.update({
        id:user?.uid+'',
        emailAddress:user?.email+'',
        fullName:this.form.value.fullName+'',
        phoneNumber:this.form.value.phoneNumber,
        city:this.form.value.city+'',
        skills:this.skills,
        jobExperiences:this.form.value.jobExperiences+'',
        Courses:this.form.value.Courses+'',
        availableTimes:this.form.value.availableTimes+'',
        
      })

      )
    ).pipe(this.hot.observe({
      loading: 'Updating Volunteer Information...',
      success:'Successfully Updating',
      error:(error)=>'This Error Happend'+error
    }),
    ).subscribe({
      next:()=>{
      this.navgateToProfilePage();

      }
    })
  }
  navgateToProfilePage(){
    this.router.navigate(['/volunteer/volunteerProfile'])
  }
}
