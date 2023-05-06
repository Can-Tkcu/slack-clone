import { AfterContentChecked, Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { UsersService } from '../services/users.service';
import { style } from '@angular/animations';
@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss'],
})
export class HomeHeaderComponent implements OnInit {
  userLoaded: boolean = false; 
  userIsLoggedIn: boolean;


  constructor(
    public afAuth: Auth,
    private afs: AngularFirestore,
    private dialog: MatDialog,
    public usersService: UsersService
  ) {}


  ngOnInit(): void {
    setTimeout(() => {
      this.userLoaded = true
      this.userIsLoggedIn = this.usersService.currentUserData.status
      this.usersService.color = this.usersService.generateColorHsl(this.usersService.currentUserData.displayName)
    }, 350)
  }


  openDialog() {
    this.dialog.open(UserDetailComponent);
  }


  logout(): void {
    this.afAuth.signOut().then(() => {
      this.afs
        .collection('users')
        .doc(this.usersService.currentUserDataID)
        .update({ status: false });
    });
  }

  
}
