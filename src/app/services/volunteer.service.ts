import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { Observable, from, map, switchMap, of } from 'rxjs';
import { AuthService } from './auth.service';
import { Volunteer } from './volunteer';
@Injectable({
  providedIn: 'root'
})
export class VolunteerService {
  private volunteerCollection: AngularFirestoreCollection<Volunteer>;
  userState$ = this.authService.userState$.pipe(
    switchMap((user)=> {
        if(user){
          return this.get(user.uid);
        }
        else {
          return of(null);
        }
    })

)
  constructor(private firestore:AngularFirestore, private authService : AuthService)
  {
    this.volunteerCollection = this.firestore.collection('volunteers');
  }
  getAll():Observable<Volunteer[]>{
    return this.volunteerCollection.valueChanges() as Observable<Volunteer[]>;
  }
  get(id:string){
    return from(this.volunteerCollection.doc<Volunteer>(id).get()).pipe( map(volunteer => volunteer.data()));

  }
  create(volunteer :Volunteer){
    return from(this.volunteerCollection.doc(volunteer.id).set(volunteer));
  }
  update(volunteer: Volunteer){
    // const docReference = doc(this.firestore, 'profiles/'+profile.id);
    // return updateDoc(docReference, {...profile});
    return from(this.volunteerCollection.doc(volunteer.id).update({...volunteer}));
  }

  delete(id: string){
    // const docReference = doc(this.firestore, 'profiles/'+id);
    // return deleteDoc(docReference);
    return from(this.volunteerCollection.doc(id).delete());

  }
}
