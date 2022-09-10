import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { ActivitiesService } from 'src/app/services/activities.service';
import { applicant } from 'src/app/services/applicant';

@Component({
  selector: 'app-applicant-view',
  templateUrl: './applicant-view.component.html',
  styleUrls: ['./applicant-view.component.css']
})
export class ApplicantViewComponent implements OnInit {
  applicants?:applicant[];
  displayedColumns: string[] = ['logo','name', 'why', 'what', 'start','end','accept'];
  dataSource:MatTableDataSource<applicant>=new MatTableDataSource<applicant>([]);
  constructor(public activityService: ActivitiesService,private route:ActivatedRoute) {
   }

  ngOnInit(): void {
    const id= this.route.snapshot.paramMap.get('id')as string;

    this.activityService.getApplicant(id).subscribe((applicant)=>{
      this.applicants=applicant;
      this.dataSource.data=applicant;
    })
  }

}
