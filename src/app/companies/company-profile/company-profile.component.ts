import { Component, OnInit } from '@angular/core';
import { MatCardContent } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Company } from 'src/app/services/company';
import { CompanyService } from 'src/app/services/company.service';
import { PictureUploadService } from 'src/app/services/picture-upload.service';
@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {
  CompanyName?:string
  Type?:string
  EmailAddress?:string
  PhoneNumber?:number|null
  WebsiteURL?:string
  id?:string 
  constructor(public companyserves:CompanyService, public auth:AuthService,private uploadService:PictureUploadService ) {
    
    
   }

  ngOnInit(): void {
    this.companyserves.userState$.subscribe((profile)=>{
      if(profile){
        this.CompanyName=profile.CompanyName;
        this.Type=profile.Type;
        this.EmailAddress=profile.EmailAddress;
        this.PhoneNumber=profile.PhoneNumber;
        this.WebsiteURL=profile.WebsiteURL
        console.log(this.CompanyName)
      }
    })
   
      
  }
  submit(event:Event){
    const input = <HTMLInputElement> event.target;
    const obj= input?.files?.[0] as File;
    this.uploadService.uploadImage(obj).pipe().subscribe()
  }

}
