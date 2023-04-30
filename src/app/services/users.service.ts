import { Injectable } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { User } from '../models/user';
import {
  DocumentData,
  Firestore,
  collection,
  collectionData,
} from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { AngularFirestoreDocument } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  public usersCollListener = new BehaviorSubject<any>({ users: [] });
  currentUserData: User;
  users: any = [];

  constructor(private afs: Firestore) {}

  getCurrentUser() {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        this.currentUserData = user;
      }
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
}
