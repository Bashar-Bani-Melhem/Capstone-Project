import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Route, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomepageComponent } from './home-page/homepage.component';
import { AboutusComponent } from './about-us/aboutus.component';
import { CompaniesComponent } from './companies/companies.component';
import { ContactusComponent } from './contact-us/contactus.component';
import { SuccessstoriesComponent } from './success-stories/successstories.component';
import { CompaniesvolanteeringactivitiesComponent } from './companies/companies-volanteering-activities/companiesvolanteeringactivities.component';
import { ActivityDetailsComponent } from './companies/activity-details/activity-details.component';
import { CompanyProfileComponent } from './companies/company-profile/company-profile.component';
import { RegisterComponent } from './register/register.component';
import { CompanyRegisterComponent } from './register/company-register/company-register.component';
import { VolunteerRegisterComponent } from './register/volunteer-register/volunteer-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostVolunteeringActivityComponent } from './companies/post-volunteering-activity/post-volunteering-activity.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatIconModule} from '@angular/material/icon';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatChipsModule} from '@angular/material/chips';
import {MatInputModule } from '@angular/material/input'
import {MatTabsModule} from '@angular/material/tabs';

const routes : Route[]=[
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'contact',component:ContactusComponent},
  {path:'successStories',component:SuccessstoriesComponent},
  {path:'home',component:HomepageComponent},
  {path:'about',component:AboutusComponent},
  {path:'companies',component:CompaniesComponent,children:[
    {path:'',redirectTo:'companyProfile',pathMatch:'full'},
    {path:'companyActivities', component:CompaniesvolanteeringactivitiesComponent},
    {path:'companyActivities/:id', component: ActivityDetailsComponent},
    {path:'companyProfile',component:CompanyProfileComponent},
    {path:'postNewActivity',component:PostVolunteeringActivityComponent},
  ]},
  {path:'register',component:RegisterComponent,children:[
    {path:'',redirectTo:'volunteerRegister',pathMatch:'full'},
    {path:'volunteerRegister', component:VolunteerRegisterComponent},
    {path:'companyRegister', component:CompanyRegisterComponent},

  ]}
]
@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    AboutusComponent,
    CompaniesComponent,
    ContactusComponent,
    SuccessstoriesComponent,
    CompaniesvolanteeringactivitiesComponent,
    ActivityDetailsComponent,
    CompanyProfileComponent,
    RegisterComponent,
    CompanyRegisterComponent,
    VolunteerRegisterComponent,
    PostVolunteeringActivityComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatFormFieldModule,
    MatChipsModule, 
    MatInputModule,
    MatTabsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
