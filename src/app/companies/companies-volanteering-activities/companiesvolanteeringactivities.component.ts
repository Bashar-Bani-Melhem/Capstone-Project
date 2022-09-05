import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from 'src/app/services/activities';
import { ActivitiesService } from 'src/app/services/activities.service';

@Component({
  selector: 'app-companiesvolanteeringactivities',
  templateUrl: './companiesvolanteeringactivities.component.html',
  styleUrls: ['./companiesvolanteeringactivities.component.css']
})
export class CompaniesvolanteeringactivitiesComponent implements OnInit {
  // activities:Observable<Activity[]>;
  constructor(public activityService:ActivitiesService) { 
  //    this.activityService.userState$.subscribe((activity)=>{
  //     if(activity){
  //       this.activities=this.activityService.getAll()
  //     }
  //    })
  }

  ngOnInit(): void {
    
  }

}
