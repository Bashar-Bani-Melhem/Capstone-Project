import { Component, OnInit } from '@angular/core';
import { Volunteer } from 'src/app/services/volunteer';
import { VolunteerService } from 'src/app/services/volunteer.service';

@Component({
  selector: 'app-all-volunteers',
  templateUrl: './all-volunteers.component.html',
  styleUrls: ['./all-volunteers.component.css']
})
export class AllVolunteersComponent implements OnInit {
 volunteers?:Volunteer[];
  constructor(public volunteerService:VolunteerService) {
    this.volunteerService.getAll().subscribe((data)=>{
      this.volunteers=data
    })
   }

  ngOnInit(): void {
  }

}
