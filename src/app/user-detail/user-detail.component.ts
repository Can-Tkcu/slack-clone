import { Component, OnInit } from '@angular/core';
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
import { AuthService } from '../services/auth.service';
import { UserImageService } from '../services/user-image.service';
import { switchMap } from 'rxjs';
import { HotToastService } from '@ngneat/hot-toast'; 

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent {
  userName: string;
  userUid: string;
  userEmail: string;
  userStatus: boolean;
  user$ = this.usersService.currentUser$

  /**
   *
   */
  constructor(
    public usersService: UsersService,
    private afs: AngularFirestore,
    public dialog: MatDialog,
    private userImageService: UserImageService,
    private toast: HotToastService
  ) {
    this.userName = this.usersService.currentUserData.displayName;
    this.userUid = this.usersService.currentUserData.uid;
    this.userEmail = this.usersService.currentUserData.email;
    this.userStatus = this.usersService.currentUserData.status;
  }
  

  uploadFile(event: any, user: any) {
    const uid = user.uid
    this.userImageService
    .uploadImage(event.target.files[0], `images/profile/${user.uid}`)
    .pipe(
      this.toast.observe({
        loading: 'Uploading profile image...',
        success: 'Image uploaded successfully',
        error: 'There was an error in uploading the image',
      }),
      switchMap((photoURL) =>
          this.usersService.updateUser({
            uid,
            photoURL,
          })
        )
      )
      .subscribe();
  }

  async updateUserCredentials() {
    const UserData = {
      displayName: this.userName,
      uid: this.userUid,
      email: this.userEmail,
      status: this.userStatus,
    }

    // await updateProfile(, {
    //       displayName: this.usersService.currentUserData.displayName,
    //     });
    this.afs
      .collection('users')
      .doc(this.usersService.currentUserData.uid)
      .update(UserData)
      .then(() => {
        this.dialog.closeAll();
      });
  }
}
