import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { updateProfile } from '@angular/fire/auth';
import { User } from '../models/user';
import { DirectMessagesService } from '../services/direct-messages.service';
import { MatIcon } from '@angular/material/icon';
import { ChannelService } from '../services/channel.service';
import { Firestore } from '@angular/fire/firestore';
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { MatDialog } from '@angular/material/dialog';

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
    private dmService: DirectMessagesService,
    private firestore: Firestore,
    public dialog: MatDialog
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
      .doc(this.usersService.currentUserData.uid)
      .update(UserData)
      .then((result: any) => {
        this.dialog.closeAll();
      });
  }
}
