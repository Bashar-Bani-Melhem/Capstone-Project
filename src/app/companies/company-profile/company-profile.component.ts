import { Component, OnInit } from '@angular/core';
import { MatCardContent } from '@angular/material/card';
import { ActivatedRoute } from '@angular/router';
import { map, take } from 'rxjs';
import { Company } from 'src/app/services/company';
import { CompanyService } from 'src/app/services/company.service';
@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {
  // company?:Company
  CompanyName?:string
  Type?:string
  EmailAddress?:string
  PhoneNumber?:number
  WebsiteURL?:string
  id?:string 
  constructor(public companyserves:CompanyService, private route:ActivatedRoute ) {
    
    
    // this.company=this.companyserves.getCompany().filter((value,index)=>{
    //   return value.Logo == 'y';
    // })[0];
    // this.companyserves.get(1).subscribe((data)=>{
    //   this.company=data;
    // })
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
    // const idf= this.route.snapshot.paramMap.get('id');
    // if(idf){
    //   this.id=idf;
    //   console.log(this.id) ;
    // }
    // this.companyserves.get(this.id+'').pipe(
    //   take(1),map(value=>value as Company)
    // ).subscribe((data)=>{
    //   console.log(data);
    //   this.company=data;
    //   console.log(this.company);
    // }
    
    // );
      
  }

}
