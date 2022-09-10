import { Component, OnInit, Type } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Company } from 'src/app/services/company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-edit-company-profile',
  templateUrl: './edit-company-profile.component.html',
  styleUrls: ['./edit-company-profile.component.css']
})
export class EditCompanyProfileComponent implements OnInit {
  CompanyName?:string;
  PhoneNumber!:number|null|undefined;
  Type?:string|null;
  WebsiteURL?:string;
  constructor(private fb:FormBuilder,private auth:AuthService,private companyServece:CompanyService,
    private router:Router,
    private hot:HotToastService,
    ) { }
  form=this.fb.group({
    CompanyName:this.fb.control(this.CompanyName,Validators.required),
    PhoneNumber:this.fb.control(0,Validators.required),
    Logo:this.fb.control('',Validators.required),
    Type:this.fb.control('',Validators.required),
    WebsiteURL:this.fb.control('',Validators.required),
  })
  ngOnInit(): void {
    this.companyServece.userState$.subscribe((profile)=>{
      if(profile){
        this.CompanyName=profile.CompanyName;
        this.Type=profile.Type;
        this.PhoneNumber=profile.PhoneNumber;
        this.WebsiteURL=profile.WebsiteURL
        console.log(this.CompanyName)
      }
    })
  }
  onSubmit(){
    this.auth.userState$.pipe(
      switchMap(user=>this.companyServece.update({
        id:user?.uid+'',
        EmailAddress:user?.email+'',
        CompanyName:this.form.value.CompanyName+'',
        Type:this.form.value.Type+'',
        WebsiteURL:this.form.value.WebsiteURL+'',
        PhoneNumber:this.form.value.PhoneNumber,
      })

      )
    ).pipe(this.hot.observe({
      loading: 'Updating Company Information...',
      success:'Successfully Updating',
      error:(error)=>'This Error Happend'+error
    }),
    ).subscribe({
      next:()=>{
      this.navgateToProfilePage();

      }
    })
  }
  navgateToProfilePage(){
    this.router.navigate(['/companies/companyProfile'])
  }
}
