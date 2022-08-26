import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/services/company';
import { CompanyService } from 'src/app/services/company.service';
@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.css']
})
export class CompanyProfileComponent implements OnInit {
  company:Company;
  constructor(private companyserves:CompanyService) {
    this.company=this.companyserves.getCompany().filter((value,index)=>{
      return value.Logo == 'y';
    })[0];
   }

  ngOnInit(): void {
  }

}
