import { Component } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { MatDialog } from '@angular/material/dialog';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { UsersService } from '../services/users.service';
import { ChannelService } from '../services/channel.service';
@Component({
  selector: 'app-home-header',
  templateUrl: './home-header.component.html',
  styleUrls: ['./home-header.component.scss'],
})
export class HomeHeaderComponent {
  constructor(
    public afAuth: Auth,
    private afs: AngularFirestore,
    private dialog: MatDialog,
    public usersService: UsersService,
    public channelService: ChannelService
  ) {}


  openDialog() {
    this.dialog.open(UserDetailComponent);
  }


  clearInput() {
    this.channelService.searchValue = '';
  }

  /**
   * firebase function is used to log out the currently logged in user
   */
  logout(): void {
    this.afAuth.signOut().then(() => {
      this.afs
        .collection('users')
        .doc(this.usersService.currentUserDataID)
        .update({ status: false });
    });
  }
}
