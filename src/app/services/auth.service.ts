import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { User } from './user';
import { updateProfile } from 'firebase/auth';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userLoggedIn: boolean;
  private currentUser: User | undefined;
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {
    this.userLoggedIn = false;
    this.afAuth.onAuthStateChanged((user) => {
      if (user) {
        this.userLoggedIn = true;
      } else {
        this.userLoggedIn = false;
      }
    });
  }


  async loginUser(email: string, password: string): Promise<any> {
    return await this.afAuth
      .signInWithEmailAndPassword(email, password)
      .then((result) => {
        console.log('Auth Service: loginUser: success' ,result.user?.uid);
        this.router.navigate(['/home']);
      })
      .catch((error) => {
        console.log('Auth Service: login error...');
        console.log('error code', error.code);
        console.log('error', error);
      });
  }


  async signupUser(user: any): Promise<any> {
    return await this.afAuth
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((result) => {
        updateProfile(result.user!, {
          displayName: user?.displayName,
        });
        this.SetUserData(result.user);  // sending user json and uid 
        result.user!.sendEmailVerification(); // immediately send the user a verification email
      })
      .catch((error) => {
        console.log('Auth Service: signup error', error);
      });
  }
  

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const userData: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
    };
    this.currentUser = userData;
    return userRef.set(userData, {
      merge: true,
    });
  }
}
