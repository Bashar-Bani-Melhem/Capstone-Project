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
  
  constructor(public activityService:ActivitiesService) { 
  
  }

  ngOnInit(): void {
    
  }

}
