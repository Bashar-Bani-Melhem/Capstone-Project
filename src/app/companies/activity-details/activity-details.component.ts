import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from 'src/app/services/activities';
import { ActivitiesService } from 'src/app/services/activities.service';

@Component({
  selector: 'app-activity-details',
  templateUrl: './activity-details.component.html',
  styleUrls: ['./activity-details.component.css']
})
export class ActivityDetailsComponent implements OnInit {
  activity?: Activity;
  constructor(public activityService: ActivitiesService, private route:ActivatedRoute ) {
     
    
   }

   ngOnInit(): void {
    const id= this.route.snapshot.paramMap.get('id')as string;
    this.activityService.get(id).subscribe((actvitiy)=> {
      this.activity = actvitiy;
    })
   }

}
