import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from 'src/app/services/activities';
import { ActivitiesService } from 'src/app/services/activities.service';

@Component({
  selector: 'app-all-activities',
  templateUrl: './all-activities.component.html',
  styleUrls: ['./all-activities.component.css']
})
export class AllActivitiesComponent implements OnInit {
  Activities?:Activity[]
  constructor(public activityService:ActivitiesService) 
  {
    this.activityService.getAll().subscribe((data)=>{
      this.Activities=data;
    }) 
  }

  ngOnInit(): void {
  }

}
