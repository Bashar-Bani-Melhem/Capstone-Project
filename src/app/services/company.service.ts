import { Injectable } from '@angular/core';
import { Company } from './company';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private companies:Company[]=[
    {id:1,
      EmailAddress:'xyz@xyz.com',
      Password:'1234',
      Logo:'h', 
      CompanyName:'xyz',
      PhoneNumber:12345,
      Type:'tele',
      WebsiteURL:'xzy@xyz.com'},
    {id:2,
      EmailAddress:'abc@abc.com',
    Password:'12345',
    Logo:'y', 
    CompanyName:'abc',
    PhoneNumber:123456,
    Type:'telecom',
    WebsiteURL:'abc@abc.com'}
  ]
  addCompany(company:Company){
    this.companies.push(company)
  }
  removeCompany(id:number){
    this.companies=this.companies.filter((value)=>{
      value.id!=id
    })
  
  }
  updateCompany(company:Company){
      const indexOfCompany= this.companies.findIndex((data)=>data.id==company.id);
      this.companies[indexOfCompany]=company;
    }
    getCompany():Company[]{
    return this.companies;
  }
  
  constructor() { }
  
}
