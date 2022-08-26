import { Injectable } from '@angular/core';
import { activity } from './activities';
@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  id:number=6;
  private activities : activity[]=[
    { id:1,
      Name:'single page application',
      Description:'create single page application for AI company that contane about us page, contact us page and login page',
      SkillsRequired:'typescript,angular,CSS', 
      StartDate:'1/1/2023',
      EndDate:'30/1/2023',
      Numberoftechnologistsrequired:3},
    { id:2,
      Name:'network',
      Description:'conect all devices in our company by local network',
      SkillsRequired:'CCNA,IP Adrees', 
      StartDate:'1/6/2023',
      EndDate:'15/6/2023',
      Numberoftechnologistsrequired:2},
    { id:3,
      Name:'deep learning project',
      Description:'create deep learning project to dectect the Corona Viros by lung images',
      SkillsRequired:'python,deep learning,AI', 
      StartDate:'13/5/2022',
      EndDate:'25/6/2023',
      Numberoftechnologistsrequired:3},
    { id:4,
      Name:'deep learning project',
      Description:'create deep learning project to dectect the Corona Viros by lung images',
      SkillsRequired:'python,deep learning,AI', 
      StartDate:'13/5/2023',
      EndDate:'25/6/2023',
      Numberoftechnologistsrequired:3},
    { id:5,
      Name:'deep learning project',
      Description:'create deep learning project to dectect the Corona Viros by lung images',
      SkillsRequired:'python,deep learning,AI', 
      StartDate:'13/5/2023',
      EndDate:'25/6/2023',
      Numberoftechnologistsrequired:3},
  ];
  constructor() {
  }
  getActivite():activity[]{
    return this.activities;
  }
  addActivity(activity:activity){
    activity.id=this.id+1;
    this.activities.push(activity);
    console.log(activity)
  }
}
