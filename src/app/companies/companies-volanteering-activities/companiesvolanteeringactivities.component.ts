import { Component, OnInit } from '@angular/core';
import { activity } from 'src/app/services/activities';
import { ActivitiesService } from 'src/app/services/activities.service';

@Component({
  selector: 'app-companiesvolanteeringactivities',
  templateUrl: './companiesvolanteeringactivities.component.html',
  styleUrls: ['./companiesvolanteeringactivities.component.css']
})
export class CompaniesvolanteeringactivitiesComponent implements OnInit {
  activities:activity[];
  constructor(private activityService:ActivitiesService) { 
    this.activities= this.activityService.getActivite();
  }

  ngOnInit(): void {
  }

}
