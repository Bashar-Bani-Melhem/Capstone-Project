import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Volunteer } from 'src/app/services/volunteer';
import { VolunteerService } from 'src/app/services/volunteer.service';

@Component({
  selector: 'app-all-volunteers',
  templateUrl: './all-volunteers.component.html',
  styleUrls: ['./all-volunteers.component.css']
})
export class AllVolunteersComponent implements OnInit {
 volunteers?:Volunteer[];
 displayedColumns: string[] = ['fullName', 'skills', 'city', 'readMore'];
 dataSource:MatTableDataSource<Volunteer>=new MatTableDataSource<Volunteer>([]);
  constructor(public volunteerService:VolunteerService) {
    this.volunteerService.getAll().subscribe((data)=>{
      this.volunteers=data
      this.dataSource.data=data;
    })
   }

  ngOnInit(): void {
  }
  applyFilter(event: Event) {
    const filterValue=(event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
