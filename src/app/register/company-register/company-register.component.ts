import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { map, take } from 'rxjs';
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
    private auth: AuthService    
    ) { }
  form=this.fb.group({
    name:this.fb.control('',Validators.required),
    email:this.fb.control('',[Validators.required,Validators.email]),
    phone:this.fb.control(0,Validators.required),
    password:this.fb.control('',[Validators.required,Validators.minLength(8)]),
    logo:this.fb.control('',Validators.required),
    type:this.fb.control('',Validators.required),
    companyURL:this.fb.control('',Validators.required),
  })
  id?:string;
  ngOnInit(): void {
    const idFromRoute=this.route.snapshot.paramMap.get('id');
    if(idFromRoute){
      this.id=idFromRoute;
      this.companyServes.get(this.id).pipe(
        take(1),
        map(value=>value as Company)
      ).subscribe((company)=>{
        this.form.setValue({
        name:company.CompanyName,
        email:company.EmailAddress,
        phone:company.PhoneNumber,
        password:company.Password,
        logo:company.Logo,
        type:company.Type,
        companyURL:company.WebsiteURL,
      })
      })
      
    }
  }
  onSubmit(){
    console.log(this.form);
    console.log(this.form.value);
    let company=this.form.value as Company;
    if(this.id!=null && this.id!=""){
      
      company.id=this.id;
      this.companyServes.update(company).subscribe(()=>{
        this.navgateToProfilePage();
      });
    }else{
      this.auth
      .signUp(this.form.value.email+'', this.form.value.password+'')
      .subscribe((data)=> {
        this.companyServes.create(company).subscribe(()=>{
          this.navgateToProfilePage();
        });
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
}
