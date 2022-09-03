import { Component, OnInit } from '@angular/core';
import { FormBuilder, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { VolunteerService } from 'src/app/services/volunteer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { HotToastService } from '@ngneat/hot-toast';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-volunteer-register',
  templateUrl: './volunteer-register.component.html',
  styleUrls: ['./volunteer-register.component.css']
})
export class VolunteerRegisterComponent implements OnInit {
  form=this.fb.group({
    fullName:this.fb.control('',Validators.required),
    emailAddress:this.fb.control('',[Validators.required,Validators.email]),
    phoneNumber:this.fb.control(0,Validators.required),
    password:this.fb.control('',[Validators.required,Validators.minLength(8)]),
    confirmPassword:this.fb.control('',[Validators.required,Validators.minLength(8)]),
    city:this.fb.control('',Validators.required),
    skills:this.fb.control('',Validators.required),
    jobExperiences:this.fb.control('',Validators.required),
    Courses:this.fb.control('',Validators.required),
    availableTimes:this.fb.control('',Validators.required),
  },{validators: this.passwordMatchingValidator()})
  constructor(private fb:FormBuilder,private volunteerService:VolunteerService,private router:Router,
    private auth: AuthService,
    private hot:HotToastService, ) { }

  ngOnInit(): void {
  }

  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  skills: string[] = [ 'PHP',  'HTML',  'CSS'];

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value) {
      this.skills.push( value as string);
      console.log(this.skills);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  remove(fruit: string): void {
    const index = this.skills.indexOf(fruit);

    if (index >= 0) {
      this.skills.splice(index, 1);
    }
  }
  onSubmit(){
    this.auth
      .signUp(this.form.value.emailAddress+'', this.form.value.password+'').pipe(
        switchMap((data)=>{
          return this.volunteerService.create({
            id:data.user?.uid+'',
            emailAddress:data.user?.email+'',
            password:this.form.value.password+'',
            city:this.form.value.city+'',
            fullName:this.form.value.fullName+'',
            phoneNumber:this.form.value.phoneNumber,
            skills:this.skills,
            jobExperiences:this.form.value.jobExperiences+'',
            Courses:this.form.value.Courses,
            availableTimes:this.form.value.availableTimes,
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
    this.router.navigate(['/volunteer/volunteerProfile'])
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
