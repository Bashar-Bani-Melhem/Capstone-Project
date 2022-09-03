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
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import {initializeApp, provideFirebaseApp} from '@angular/fire/app';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
// import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import{getFirestore, provideFirestore}from '@angular/fire/firestore';
import { environment } from 'src/environments/environment';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';
import { VolunteerComponent } from './volunteer/volunteer.component';
import { VolunteerProfileComponent } from './volunteer/volunteer-profile/volunteer-profile.component';
import { AllActivitiesComponent } from './volunteer/all-activities/all-activities.component';
import { AllCompaniesComponent } from './volunteer/all-companies/all-companies.component';
import { CompanyDetailsComponent } from './volunteer/company-details/company-details.component';
import { AllVolunteersComponent } from './companies/all-volunteers/all-volunteers.component';
import { VolunteersDetailsComponent } from './companies/volunteers-details/volunteers-details.component';
import { NotloggedGuard } from './services/notlogged.guard';
import { HotToastModule } from '@ngneat/hot-toast';
import { EditCompanyProfileComponent } from './companies/edit-company-profile/edit-company-profile.component';
import { CompanyLoginComponent } from './login/company-login/company-login.component';
import { VolunteerLoginComponent } from './login/volunteer-login/volunteer-login.component';
// import { HttpClientModule } from '@angular/common/http';
const routes : Route[]=[
  {path:'',redirectTo:'/home',pathMatch:'full'},
  {path:'contact',component:ContactusComponent},
  {path:'successStories',component:SuccessstoriesComponent},
  {path:'home',component:HomepageComponent},
  {path:'about',component:AboutusComponent},
  {path:'companies',component:CompaniesComponent,canActivate:[AuthGuard],children:[
    {path:'',redirectTo:'companyProfile',pathMatch:'full'},
    {path:'companyActivities', component:CompaniesvolanteeringactivitiesComponent},
    {path:'companyActivities/:id', component: ActivityDetailsComponent},
    {path:'companyProfile',component:CompanyProfileComponent},
    {path:'postNewActivity',component:PostVolunteeringActivityComponent},
    {path:'allVolunteers',component:AllVolunteersComponent},
    {path:'allVolunteers/:id',component:VolunteersDetailsComponent },
    {path:'editProfile',component:EditCompanyProfileComponent}
  ]},
  {path:'volunteer',component:VolunteerComponent,canActivate:[AuthGuard],children:[
    {path:'',redirectTo:'volunteerProfile',pathMatch:'full'},
    {path:'volunteerProfile', component:VolunteerProfileComponent},
    {path:'allCompanies',component:AllCompaniesComponent},
    {path:'allCompanies/:id', component: CompanyDetailsComponent},
    {path:'allActivities',component:AllActivitiesComponent},
  ]},
  {path:'register',component:RegisterComponent,canActivate:[NotloggedGuard],children:[
    {path:'',redirectTo:'volunteerRegister',pathMatch:'full'},
    {path:'volunteerRegister', component:VolunteerRegisterComponent},
    {path:'companyRegister', component:CompanyRegisterComponent},
    
  ]},
  {path:'login',component:LoginComponent,canActivate:[NotloggedGuard],children:[
    {path:'',redirectTo:'volunteerLogin',pathMatch:'full'},
    {path:'volunteerLogin',component:VolunteerLoginComponent},
    {path:'companyLogin',component:CompanyLoginComponent}
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
    LoginComponent,
    VolunteerComponent,
    VolunteerProfileComponent,
    AllActivitiesComponent,
    AllCompaniesComponent,
    CompanyDetailsComponent,
    AllVolunteersComponent,
    VolunteersDetailsComponent,
    EditCompanyProfileComponent,
    CompanyLoginComponent,
    VolunteerLoginComponent,
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatIconModule,
    MatSelectModule,
    MatFormFieldModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule,
    // provideFirestore(()=>getFirestore()),
    AngularFireAuthModule,
    MatChipsModule, 
    MatInputModule,
    MatTabsModule,
    MatCardModule,
    HotToastModule.forRoot(),
    
    

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
