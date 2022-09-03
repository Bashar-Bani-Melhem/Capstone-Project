import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PictureUploadService } from 'src/app/services/picture-upload.service';
import { VolunteerService } from 'src/app/services/volunteer.service';

@Component({
  selector: 'app-volunteer-profile',
  templateUrl: './volunteer-profile.component.html',
  styleUrls: ['./volunteer-profile.component.css']
})
export class VolunteerProfileComponent implements OnInit {

    id?:string;
    fullName?:string;
    emailAddress?:string;
    phoneNumber?:number|null|undefined;
    city?:string;
    skills?:string[]|null|undefined;
    jobExperiences?:string;
    Courses?:string|null|undefined;
    availableTimes?:string|null|undefined;
  constructor(public volunteerServes:VolunteerService, public auth:AuthService,private uploadService:PictureUploadService ) {
    
    
   }

  ngOnInit(): void {
    this.volunteerServes.userState$.subscribe((profile)=>{
      if(profile){
        this.fullName=profile.fullName;
        this.emailAddress=profile.emailAddress;
        this.phoneNumber=profile.phoneNumber;
        this.city=profile.city;
        this.skills=profile.skills;
        this.jobExperiences=profile.jobExperiences;
        this.Courses=profile.Courses;
        this.availableTimes=profile.availableTimes;
        
      }
    })
   
      
  }
  submit(event:Event){
    const input = <HTMLInputElement> event.target;
    const obj= input?.files?.[0] as File;
    this.uploadService.uploadImage(obj).subscribe()
  }


}
