import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Volunteer } from 'src/app/services/volunteer';
import { VolunteerService } from 'src/app/services/volunteer.service';

@Component({
  selector: 'app-volunteers-details',
  templateUrl: './volunteers-details.component.html',
  styleUrls: ['./volunteers-details.component.css']
})
export class VolunteersDetailsComponent implements OnInit {
  volunteer?:Volunteer
  constructor( private route:ActivatedRoute,public volunteerService:VolunteerService) { }

  ngOnInit(): void {
    const id= this.route.snapshot.paramMap.get('id')as string;
    this.volunteerService.get(id).subscribe((volunteer)=> {
      this.volunteer = volunteer;
    })
  }

}
