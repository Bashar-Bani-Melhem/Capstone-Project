import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, FormControl, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap, take } from 'rxjs';
import { Activity } from 'src/app/services/activities';
import { ActivitiesService } from 'src/app/services/activities.service';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-post-volunteering-activity',
  templateUrl: './post-volunteering-activity.component.html',
  styleUrls: ['./post-volunteering-activity.component.css']
})
export class PostVolunteeringActivityComponent implements OnInit {
  form=this.fb.group({
    Name:this.fb.control('',Validators.required),
    Description:this.fb.control('',Validators.required),
    range:this.fb.group({
      StartDate: new FormControl<Date|null>(null),
      EndDate: new FormControl<Date|null>(null),
     }),
    SkillsRequired:this.fb.control('',Validators.required),
    StartDate:this.fb.control('',Validators.required),
    EndDate:this.fb.control('',Validators.required),
    Numberoftechnologistsrequired:this.fb.control(0,Validators.required),
  })
  constructor(private fb:FormBuilder,private activityService:ActivitiesService,private router:Router,
    private auth:AuthService,
    private hot:HotToastService,
    private companyService:CompanyService
    ) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.companyService.userState$.pipe(take(1),switchMap((data)=>{
      return this.activityService.create({
        Name:this.form.value.Name+'',
        companyId: data?.id,
        companyName:data?.CompanyName,
        companyType:data?.Type,
        Description:this.form.value.Description+'',
        SkillsRequired:this.skills,
        Numberoftechnologistsrequired:this.form.value.Numberoftechnologistsrequired,
        range:{... this.form.value.range},
      })
    })).pipe(this.hot.observe({
        loading: 'Creating Volunteering Activity...',
        success:'Successfully Cerated',
        error:(error)=>'This Error Happend'+error
      })).subscribe({
          next:()=>{
            console.log('created Dooooneeeeeeeee')
          this.navgateToProfilePage();
  
          }  });
   
    

     
  }
  navgateToProfilePage(){
    this.router.navigate(['/companies/companyActivities'])
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
}
    