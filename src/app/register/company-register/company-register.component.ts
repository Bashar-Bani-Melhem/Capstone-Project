import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

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
  form=this.fb.group({
    name:this.fb.control('',Validators.required),
    email:this.fb.control('',[Validators.required,Validators.email]),
    phone:this.fb.control('',Validators.required),
    password:this.fb.control('',Validators.required),
    logo:this.fb.control('',Validators.required),
    type:this.fb.control('',Validators.required),
    companyURL:this.fb.control('',Validators.required),
  })
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
  }
  onSubmit(){
    console.log(this.form);
    console.log(this.form.value);
    this.form.setValue({
      name:'',
      email:'',
      phone:'',
      password:'',
      logo:'',
      type:'',
      companyURL:'',
    })

  }
}
