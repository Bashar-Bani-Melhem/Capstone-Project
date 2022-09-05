import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/services/company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.css']
})
export class CompanyDetailsComponent implements OnInit {
 company?:Company
  constructor(private route:ActivatedRoute,public companyService:CompanyService) { }

  ngOnInit(): void {
    const id= this.route.snapshot.paramMap.get('id')as string;
    this.companyService.get(id).subscribe((company)=> {
      this.company = company;
    })
  }

}
