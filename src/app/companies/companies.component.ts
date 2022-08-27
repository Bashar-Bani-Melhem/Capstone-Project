import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  onProfile(){
    this.router.navigate(['/companies/companyProfile'])
  }
  onActivities(){
    this.router.navigate(['/companies/companyActivities'])
  }
  onPost(){
    
    this.router.navigate(['/companies/postNewActivity'])
  }
}
