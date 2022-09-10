import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'volunteerproject';
  constructor(private router:Router,public authService:AuthService){

  }
  logout(){
    this.authService.signOut().subscribe(()=>{
      this.router.navigate(['home'])
    });
  }
  cprofile(){
    this.router.navigate(['companies'])
  }
  vprofile(){
    this.router.navigate(['volunteer'])
  }
}
