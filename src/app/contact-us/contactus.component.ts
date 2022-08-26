import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }
  onSubmit(){
    this.router.navigate(['/home'])
  }
}
