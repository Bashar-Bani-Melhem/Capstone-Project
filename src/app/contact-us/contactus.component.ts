import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {
  form=this.fb.group({
    Name:this.fb.control('',Validators.required),
    email:this.fb.control('',Validators.required),
    phone:this.fb.control('',Validators.required),
    massage:this.fb.control('',Validators.required),
   
  })
  constructor(private fb:FormBuilder,private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.router.navigate(['/home'])
  }
}
