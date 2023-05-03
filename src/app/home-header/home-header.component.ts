import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailComponent } from '../user-detail/user-detail.component';
@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss'],
})
export class HomeHeaderComponent {
  constructor(public afAuth: Auth, private afs: AngularFirestore, private dialog: MatDialog) {}


  openDialog() {
    this.dialog.open(UserDetailComponent)
  }

  logout(): void {
    this.afAuth.signOut();
  }
}
