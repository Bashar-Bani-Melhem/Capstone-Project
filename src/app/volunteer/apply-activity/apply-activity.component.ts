import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Activity } from 'src/app/services/activities';
import { ActivitiesService } from 'src/app/services/activities.service';
import { Company } from 'src/app/services/company';
import { CompanyService } from 'src/app/services/company.service';

@Component({
  selector: 'app-apply-activity',
  templateUrl: './apply-activity.component.html',
  styleUrls: ['./apply-activity.component.css']
})
export class ApplyActivityComponent implements OnInit {
  activity?: Activity;
  
  constructor(public activityService:ActivitiesService, private route:ActivatedRoute,public companyService:CompanyService ) { }

  ngOnInit(): void {
    const id= this.route.snapshot.paramMap.get('id')as string;
    this.activityService.get(id).subscribe((actvitiy)=> {
      this.activity = actvitiy;
      
    })
    
  }

}
