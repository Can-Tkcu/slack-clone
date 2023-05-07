import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { UsersService } from './users.service';
@Injectable({
  providedIn: 'root',
})
export class DirectMessagesService {
  channelID: string;
  currentChannelMessages: any;
  currentChannelRecipient: any;
  currentChannelPayload: any;
  currentChannelData: any;
  allDmChannels: Array<any> = [];

  constructor(private afs: AngularFirestore, private route: Router, private usersService: UsersService) {}

  /**
   * Retrieves all chats from the data base
   */
  async getChatsFromDb() {
    this.afs
      .collection('direct-messages')
      .doc(this.channelID)
      .valueChanges()
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
      .subscribe((channels: any) => {
        this.allDmChannels = [];
        channels.forEach((channel) => {
          if (channel.users.senderID == this.usersService.currentUserDataID)
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
}
