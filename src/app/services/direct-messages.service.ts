import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
import { MatDialog } from '@angular/material/dialog';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Injectable({
  providedIn: 'root',
})
export class DirectMessagesService {
  channelID: string;
  selectedChannelID: string;
  currentChannelMessages: any;
  currentChannelRecipient: any;
  currentChannelPayload: any;
  currentChannelData: any;
  allDmChannels: Array<any> = [];
  userExists: boolean = false;
  constructor(
    private afs: AngularFirestore,
    private route: Router,
    private usersService: UsersService,
    private dialog: MatDialog
  ) {}

  /**
   * Retrieves all chats from the data base
   */
  async getChatsFromDb() {
    this.afs
      .collection('direct-messages')
      .doc(this.channelID)
      .valueChanges()
      .pipe(untilDestroyed(this))
      .subscribe((channel: any) => {
        this.currentChannelMessages = channel.payload.messages;
        this.currentChannelRecipient = channel.users.recipientID;
        this.currentChannelPayload = channel.payload.messages;
        this.currentChannelData = channel;
      });
  }

  getAllDms(): void {
    this.afs
      .collection('direct-messages')
      .valueChanges({ idField: 'dmChannelId' })
      .pipe(untilDestroyed(this))
      .subscribe((channels: any) => {
        this.allDmChannels = [];
        channels.forEach((channel) => {
          if (channel.users.senderID == this.usersService.currentUserDataID)
            // console.log(this.allDmChannels.)
            this.allDmChannels.push(channel);
            this.sortUsersByName();
        });
      });
  }

  sortUsersByName() {
    this.allDmChannels.sort((a, b) => {
      if (
        a.users.recipientName.toLowerCase() <
        b.users.recipientName.toLowerCase()
      ) {
        return -1;
      } else if (
        a.users.recipientName.toLowerCase() >
        b.users.recipientName.toLowerCase()
      ) {
        return 1;
      } else {
        return 0;
      }
    });
  }

  async createDmChannel(uid: string, name: string) {
    const channelRef: AngularFirestoreCollection =
      this.afs.collection('direct-messages');

    const channelData = {
      users: {
        senderID: this.usersService.currentUserData.uid,
        senderName: this.usersService.currentUserData.displayName,
        recipientID: uid,
        recipientName: name,
      },
      payload: {
        messages: [],
      },
    };

    const indexOfUser = this.allDmChannels.findIndex((channel) => channel.users.recipientID === uid);
      indexOfUser > -1 ? this.userExists = true : channelRef.add(channelData).then((channel) => {
        this.route.navigate(['/home/direct-messages/' + channel.id]);
        return this.dialog.closeAll();
      });

      
  }
}
