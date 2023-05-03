import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { updateProfile } from '@angular/fire/auth';
import { User } from '../models/user';
import { DirectMessagesService } from '../services/direct-messages.service';
import { MatIcon } from '@angular/material/icon';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent {
  userName: string;
  userUid: string;
  userEmail: string;
  /**
   *
   */
  constructor(
    private usersService: UsersService,
    private afs: AngularFirestore,
    private userService: UsersService,
    private dmService: DirectMessagesService
  ) {
    this.userName = this.usersService.currentUserData.displayName;
    this.userUid = this.usersService.currentUserData.uid;
    this.userEmail = this.usersService.currentUserData.email;
  }

  async updateUserCredentials() {
    const UserData: User = {
      displayName: this.userName,
      uid: this.userUid,
      email: this.userEmail
    }

    // await updateProfile(, {
    //       displayName: this.usersService.currentUserData.displayName,
    //     });
    this.afs
      .collection('users')
      .doc(this.userService.currentUserData.uid)
      .update(UserData)
  }
}
