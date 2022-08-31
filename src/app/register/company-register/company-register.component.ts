import { Component, OnInit } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormControl, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { map, switchMap, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

import { Company } from 'src/app/services/company';
import { CompanyService } from 'src/app/services/company.service';
@Component({
  selector: 'app-company-register',
  templateUrl: './company-register.component.html',
  styleUrls: ['./company-register.component.css']
})
export class CompanyRegisterComponent implements OnInit {
  // form= new FormGroup({
  //   name:new FormControl('',Validators.required),
  //   email:new FormControl('',[Validators.required,Validators.email]),
  //   phone:new FormControl('',Validators.required),
  //   password:new FormControl('',Validators.required),
  //   logo:new FormControl('',Validators.required),
  //   type:new FormControl('',Validators.required),
  //   companyURL:new FormControl('',Validators.required),
    
  // })
  
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
    // const idFromRoute=this.route.snapshot.paramMap.get('id');
    // if(idFromRoute){
    //   this.id=idFromRoute;
    //   this.companyServes.get(this.id).pipe(
    //     take(1),
    //     map(value=>value as Company)
    //   ).subscribe((company)=>{

    //     this.form.setValue({
    //     CompanyName:company.CompanyName,
    //     EmailAddress:company.EmailAddress,
    //     PhoneNumber:company.PhoneNumber,
    //     Password:company.Password,
    //     confirmPassword:company.confirmPassword,
    //     Logo:company.Logo,
    //     Type:company.Type,
    //     WebsiteURL:company.WebsiteURL,
    //   })
    //   })
      
    // }
  }
  onSubmit(){
    console.log(this.form);
    console.log(this.form.value);
    let company=this.form.value as Company;
    if(this.id!=null && this.id!=""){
      
      company.id=this.id;
      this.companyServes.update(company).pipe(
        this.hot.observe({
          loading: 'Updating User...',
          success:'Successfully Updating',
          error:(error)=>'This Error Happend'+error
        })
      )
      .subscribe({
        next:()=>{
                  this.navgateToProfilePage();

        }
      });
    }else{
      this.auth
      .signUp(this.form.value.EmailAddress+'', this.form.value.Password+'').pipe(
        switchMap((data)=>{
          return this.companyServes.create({
            id:data.user?.uid+'',
            EmailAddress:data.user?.email+'',
            Password:this.form.value.Password+'',
            Logo:this.form.value.Logo+'',
            CompanyName:this.form.value.CompanyName+'',
            // PhoneNumber:this.form.value.PhoneNumber  TODOOO,
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
    
    //----------------------old set value
    // this.form.setValue({
    //   name:'',
    //   email:'',
    //   phone:'',
    //   password:'',
    //   logo:'',
    //   type:'',
    //   companyURL:'',
    // })

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
