import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators,FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { take } from 'rxjs';
import { Activity } from 'src/app/services/activities';
import { ActivitiesService } from 'src/app/services/activities.service';
import { AuthService } from 'src/app/services/auth.service';
import { Company } from 'src/app/services/company';
import { CompanyService } from 'src/app/services/company.service';
import { VolunteerService } from 'src/app/services/volunteer.service';

@Component({
  selector: 'app-apply-activity',
  templateUrl: './apply-activity.component.html',
  styleUrls: ['./apply-activity.component.css']
})
export class ApplyActivityComponent implements OnInit {
  activity?: Activity;
  form=this.fb.group({
    why:this.fb.control('',Validators.required),
    whatCanVolunteering:this.fb.control('',Validators.required),
    range:this.fb.group({
      StartDate: new FormControl<Date|null>(null),
      EndDate: new FormControl<Date|null>(null),
     })})
  constructor(public activityService:ActivitiesService, private route:ActivatedRoute,public companyService:CompanyService,
     private volunteerService:VolunteerService,private fb:FormBuilder,private auth:AuthService
     ,private hot:HotToastService
     ) { }

  ngOnInit(): void {
    const id= this.route.snapshot.paramMap.get('id')as string;
    this.activityService.get(id).subscribe((actvitiy)=> {
      this.activity = actvitiy;
      
    })
    
  }
  
  apply(){
    const id= this.route.snapshot.paramMap.get('id')as string;
    this.auth.userState$.pipe(take(1)).subscribe((log)=>{
      this.volunteerService.userState$.pipe(take(1)).subscribe((user)=>{
      this.activityService.currentUserActivities$.pipe(take(1)).pipe(this.hot.observe({
        loading: 'Applying Activity...',
        success:'Successfully Applying',
        error:(error)=>'This Error Happend'+error
      }),
      ).subscribe((data)=>{
        if(data){
          this.activityService.addApplicant(id,{
            activityId:id,
            applicantId:user?.id+'',
            applicantName:user?.fullName+'',
            approved:false,
            range:{... this.form.value.range},
            whyAppling:this.form.value.why+'',
            whatCanVolunteer:this.form.value.whatCanVolunteering+'',
            logo:log?.photoURL
          })

        }
      })
    })
    })
    
  }
}
