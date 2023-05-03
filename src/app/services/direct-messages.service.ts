import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  updateDoc,
} from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { UsersService } from './users.service';
@Injectable({
  providedIn: 'root',
})
export class DirectMessagesService {
  directMessageChannelID: string = '';
  channelID: string;
  dmChannels: Array<any> = [];
  currentChannelMessages: any;
  dmCollection: CollectionReference;
  currentChannelRecipient: any;
  currentChannelUsers: any; 
  currentChannelPayload: any;
  currentChannelData: any;
  currentChannelSender: any;

  constructor(private afs: AngularFirestore, private route: Router) { }

  /**
   * Retrieves all chats from the data base
   */
  async getChatsFromDb() {
    this.afs
      .collection('direct-messages')
      .doc(this.channelID)
      .valueChanges()
      .subscribe((channel: any) => {
        this.dmChannels = channel;
        this.currentChannelMessages = channel.payload.messages;
        this.currentChannelRecipient = channel.users.recipientName;
        this.currentChannelSender = channel.users.senderName;
        this.currentChannelPayload = channel.payload.messages;
        this.currentChannelUsers = channel.users;
        this.currentChannelData = channel;
      });

    // updateGame(data, id) {
    //   const gameDocumentReference = doc(this.afs, 'direct-messages', id);
    //   return updateDoc(gameDocumentReference, data);
    // }
  }
}
