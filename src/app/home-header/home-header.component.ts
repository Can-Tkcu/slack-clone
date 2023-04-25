import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss'],
})
export class HomeHeaderComponent {
  constructor(public afAuth: Auth, private afs: AngularFirestore) {}

  logout(): void {
    this.afAuth.signOut();
  }
}
