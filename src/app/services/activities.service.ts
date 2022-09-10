import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { map, Observable, from, of, switchMap } from 'rxjs';
import { Activity } from './activities';
import { applicant } from './applicant';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class ActivitiesService {
  private activitiesCollection: AngularFirestoreCollection<Activity>;
  currentUserActivities$:Observable<Activity[]|null|undefined>
  // userState$ = this.authService.userState$.pipe(
  //     switchMap((user)=> {
  //         if(user){
  //           return this.get(user.uid);
  //         }
  //         else {
  //           return of(null);
  //         }
  //     })

  // )
  constructor(private firestore:AngularFirestore, private authService : AuthService) 
  {
    this.activitiesCollection = this.firestore.collection('activities');
    this.currentUserActivities$=this.authService.userState$.pipe(
      switchMap((data)=>{
        if(data){
          return this.getCompanyActivities(data?.uid);
        }
        else{
          return of(null)
        }
      })
    )
  }
  getAll():Observable<Activity[]>{
    return this.activitiesCollection.valueChanges({'idField':'uid'}) as Observable<Activity[]>;
  }
  get(id:string){
    return from(this.activitiesCollection.doc<Activity>(id).get()).pipe( map(activity => activity.data()));

  }
  getCompanyActivities(companyId:string){
   return this.firestore.collection('activities',ref=>ref.where('companyId','==',companyId))
    .valueChanges({'idField':'uid'}) as Observable<Activity[]>;
  }
  create(activity :Activity){
    return from(this.activitiesCollection.add(activity));
  }
  update(activity: Activity){
    // const docReference = doc(this.firestore, 'profiles/'+profile.id);
    // return updateDoc(docReference, {...profile});
    return from(this.activitiesCollection.doc().update({...activity}));
  }

  delete(id: string){
    // const docReference = doc(this.firestore, 'profiles/'+id);
    // return deleteDoc(docReference);
    return from(this.activitiesCollection.doc(id).delete());

  }
  addApplicant(activityId:string,applicant:applicant){
    this.activitiesCollection.doc(activityId).collection<applicant>('applicants').add(applicant)
  }
  getApplicant(activityId: string){
    return this.firestore.collection<Activity>('activities').doc(activityId).collection<applicant>('applicants').valueChanges();
  }
}
 