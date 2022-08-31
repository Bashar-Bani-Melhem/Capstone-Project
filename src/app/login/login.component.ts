import { Component, OnInit } from '@angular/core';
import { FirebaseError } from '@angular/fire/app';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder, private authService:AuthService,private router:Router) { }
  loginForm = this.fb.group({
    email:this.fb.control('',[Validators.required,Validators.email]),
    password:this.fb.control('',[Validators.required,Validators.minLength(8)]),
  })
  formStatus?:string;
  ngOnInit(): void {
  }
  get email(){
    return this.loginForm.controls.email
  }
  get password(){
    return this.loginForm.controls.password
  }
  submit(){
    this.authService.signIn(this.loginForm.controls.email.value+'',
    this.loginForm.controls.password.value+'').subscribe({
      next: (data)=>{
        this.router.navigate(['companies/companyProfile'])
      },
      error:(error:FirebaseError)=>{
        this.formStatus= error.message; 
           }
    })
  }
}
