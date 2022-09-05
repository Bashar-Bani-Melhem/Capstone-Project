import { Component, OnInit } from '@angular/core';
import { Company } from 'src/app/services/company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-all-companies',
  templateUrl: './all-companies.component.html',
  styleUrls: ['./all-companies.component.css']
})
export class AllCompaniesComponent implements OnInit {
  companies?:Company[]
  constructor(public companyService:CompanyService) { }

  ngOnInit(): void {
    this.companyService.getAll().subscribe((data)=>{
      this.companies=data
    })

  }

}
