import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { collectionData, CollectionReference, doc, docData, DocumentData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, updateDoc } from '@firebase/firestore';
import { Observable, from, map, switchMap, of } from 'rxjs';
import { AuthService } from './auth.service';
import { Company } from './company';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  private companiesCollection: AngularFirestoreCollection<Company>;
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
    this.companiesCollection = this.firestore.collection('companies');
  }
  getAll():Observable<Company[]>{
    return this.companiesCollection.valueChanges() as Observable<Company[]>;
  }
  get(id:string){
    return from(this.companiesCollection.doc<Company>(id).get()).pipe( map(company => company.data()));

  }
  create(company :Company){
    return from(this.companiesCollection.doc(company.id).set(company));
  }
  update(company: Company){
    // const docReference = doc(this.firestore, 'profiles/'+profile.id);
    // return updateDoc(docReference, {...profile});
    return from(this.companiesCollection.doc(company.id).update({...company}));
  }

  delete(id: string){
    // const docReference = doc(this.firestore, 'profiles/'+id);
    // return deleteDoc(docReference);
    return from(this.companiesCollection.doc(id).delete());

  }
  // private companies:Company[]=[
  //   {id:1,
  //     EmailAddress:'xyz@xyz.com',
  //     Password:'1234',
  //     Logo:'h', 
  //     CompanyName:'xyz',
  //     PhoneNumber:12345,
  //     Type:'tele',
  //     WebsiteURL:'xzy@xyz.com'},
  //   {id:2,
  //     EmailAddress:'abc@abc.com',
  //   Password:'12345',
  //   Logo:'y', 
  //   CompanyName:'abc',
  //   PhoneNumber:123456,
  //   Type:'telecom',
  //   WebsiteURL:'abc@abc.com'}
  // ]
  // addCompany(company:Company){
  //   this.companies.push(company)
  // }
  // removeCompany(id:number){
  //   this.companies=this.companies.filter((value)=>{
  //     value.id!=id
  //   })
  
  // }
  // updateCompany(company:Company){
  //     const indexOfCompany= this.companies.findIndex((data)=>data.id==company.id);
  //     this.companies[indexOfCompany]=company;
  //   }
  //   getCompany():Company[]{
  //   return this.companies;
  // }
  
  
  
}
