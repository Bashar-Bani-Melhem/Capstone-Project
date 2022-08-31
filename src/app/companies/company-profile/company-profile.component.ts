import { Component, OnInit } from '@angular/core';
import { MatCardContent } from '@angular/material/card';
import { Company } from 'src/app/services/company';
import { CompanyService } from 'src/app/services/company.service';
@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {
  constructor(public companyserves:CompanyService) {
    // this.company=this.companyserves.getCompany().filter((value,index)=>{
    //   return value.Logo == 'y';
    // })[0];
    // this.companyserves.get(1).subscribe((data)=>{
    //   this.company=data;
    // })
   }

  ngOnInit(): void {
    
      
  }

}
