import { Component, OnInit, Type } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-edit-company-profile',
  templateUrl: './edit-company-profile.component.html',
  styleUrls: ['./edit-company-profile.component.css']
})
export class EditCompanyProfileComponent implements OnInit {

  constructor(private fb:FormBuilder,private auth:AuthService,private companyServece:CompanyService,
    private router:Router,
    private hot:HotToastService,
    ) { }
  form=this.fb.group({
    CompanyName:this.fb.control('',Validators.required),
    PhoneNumber:this.fb.control(0,Validators.required),
    Logo:this.fb.control('',Validators.required),
    Type:this.fb.control('',Validators.required),
    WebsiteURL:this.fb.control('',Validators.required),
  })
  ngOnInit(): void {
  }
  onSubmit(){
    this.auth.userState$.pipe(
      switchMap(user=>this.companyServece.update({
        id:user?.uid+'',
        EmailAddress:user?.email+'',
        CompanyName:this.form.value.CompanyName+'',
        Logo:this.form.value.Logo+'',
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
