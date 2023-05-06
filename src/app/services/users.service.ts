import { Injectable } from '@angular/core';
import { getAuth, onAuthStateChanged, Auth, authState } from '@angular/fire/auth';
import { User } from '../models/user';
import {
  DocumentData,
  Firestore,
  collection,
  collectionData,
  doc,
  updateDoc,
} from '@angular/fire/firestore';
import { BehaviorSubject, Observable, from } from 'rxjs';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { reauthenticateWithCredential } from 'firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public usersCollListener = new BehaviorSubject<any>({ users: [] });
  currentUserData: User;
  currentUserDataID: any
  users: any = [];
  currentUser$ = authState(this.auth)
  userData: any;
  color: any;

  constructor(private afs: Firestore, private firestore: AngularFirestore, private auth: Auth) { }

  
  getCurrentUser() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.userData = user;
        this.currentUserDataID = user.uid;
      }
      this.firestore
        .collection('users')
        .doc(this.currentUserDataID)
        .valueChanges()
        .subscribe((changes: any) => {
          this.currentUserData = changes;
        });
    });
  }


  getAllUsers(): any {
    const usersCollection = collection(this.afs, 'users');
    const users$ = collectionData(usersCollection, { idField: 'uid' });
    users$.subscribe((_users) => {
      this.usersCollListener.next({ users: _users });
      this.sortUsers(_users)
    });
  }


  /**
   * function to sort users by name
   */
  sortUsers(_users: DocumentData[]) {
    this.users = _users;
    this.users.sort((a, b) => {
      if (a.displayName.toLowerCase() < b.displayName.toLowerCase()) {
        return -1;
      } else if (a.displayName.toLowerCase() > b.displayName.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  }


  updateUser(user: any): Observable<void> {
    const ref = doc(this.afs, 'users', user.uid);
    return from(updateDoc(ref, { ...user }));
  }


  getHashOfString(str: any) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      // tslint:disable-next-line: no-bitwise
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }
    hash = Math.abs(hash);
    return hash;
  };
  

  normalizeHash(hash: any, min, max) {
    return Math.floor((hash % (max - min)) + min);
  };
  

  generateHSL(name: any) {
    const hash = this.getHashOfString(name);
    const h = this.normalizeHash(hash, 0, 360);
    const s = this.normalizeHash(hash, 0, 255);
    const l = this.normalizeHash(hash, 0 , 255);
    return [h, s, l];
  };
  

  HSLtoString(hsl: any) {
    return `hsl(${hsl[0]}, ${hsl[1]}%, ${hsl[2]}%)`;
  };

  
  generateColorHsl(id: any) {
    return this.HSLtoString(this.generateHSL(id));
  };
}
