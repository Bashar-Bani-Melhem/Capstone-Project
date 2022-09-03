import { Component, OnInit } from '@angular/core';
import { FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

import { CompanyService } from 'src/app/services/company.service';
@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.css']
})
export class CompanyRegisterComponent implements OnInit {
  
  constructor(private fb:FormBuilder,private companyServes:CompanyService,private router:Router,
    private route:ActivatedRoute,
    private auth: AuthService,
    private hot:HotToastService,   
    ) { }
  form=this.fb.group({
    CompanyName:this.fb.control('',Validators.required),
    EmailAddress:this.fb.control('',[Validators.required,Validators.email]),
    PhoneNumber:this.fb.control(0,Validators.required),
    Password:this.fb.control('',[Validators.required,Validators.minLength(8)]),
    confirmPassword:this.fb.control('',[Validators.required,Validators.minLength(8)]),
    Logo:this.fb.control('',Validators.required),
    Type:this.fb.control('',Validators.required),
    WebsiteURL:this.fb.control('',Validators.required),
  },{validators: this.passwordMatchingValidator()})
  id?:string;
  ngOnInit(): void {
    
  }
  onSubmit(){
      this.auth
      .signUp(this.form.value.EmailAddress+'', this.form.value.Password+'').pipe(
        switchMap((data)=>{
          return this.companyServes.create({
            id:data.user?.uid+'',
            EmailAddress:data.user?.email+'',
            Password:this.form.value.Password+'',
            Logo:this.form.value.Logo+'',
            CompanyName:this.form.value.CompanyName+'',
            PhoneNumber:this.form.value.PhoneNumber,
            Type:this.form.value.Type+'',
            WebsiteURL:this.form.value.WebsiteURL+'',
          });
        })
      ).pipe(this.hot.observe({
        loading: 'Regestering User...',
        success:'Successfully Regestered',
        error:(error)=>'This Error Happend'+error
      }),
      )
      .subscribe({
          next:()=>{
          this.navgateToProfilePage();

          }
    });
      

  }
  navgateToProfilePage(){
    this.router.navigate(['/companies/companyProfile'])
  }
  passwordMatchingValidator():ValidatorFn{
    
    return (control): ValidationErrors | null =>{
      const pass=control.get('Password')?.value;
      const confirm=control.get('confirmPassword')?.value;
      if(pass && confirm && pass !== confirm){
        return{
          passwoedDontMatch:true}
      }
      return null
    }
    
  }
}
