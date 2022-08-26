import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { activity } from 'src/app/services/activities';
import { ActivitiesService } from 'src/app/services/activities.service';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css']
})
export class ActivityDetailsComponent implements OnInit {
  activity: activity;
  constructor(private activityService: ActivitiesService, private route:ActivatedRoute ) {
    const id= parseInt(this.route.snapshot.paramMap.get('id')as string); 
    this.activity= activityService.getActivite().filter((value,index)=>{
      return value.id == id;
    })[0];
  }

  ngOnInit(): void {
  }

}
