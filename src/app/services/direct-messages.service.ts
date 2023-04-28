import { Injectable, OnInit } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class DirectMessagesService implements OnInit{
  directMessageChannelID: string = '';
  dmChannels = [];
  currentChannel: any;
  constructor(private afs: Firestore) {
  }

  ngOnInit(): void {
    this.getChatsFromDb()
    this.currentChannel = this.dmChannels[0]
  }

  /**
   * Retrieves all chats from the data base
   */
  getChatsFromDb() {
    const dmCollection = collection(this.afs, 'direct-messages');
    const dmChannel = collectionData(dmCollection, { idField: 'dmChannelId' });
    dmChannel.subscribe((chatsData) => {
      this.dmChannels = chatsData;
      console.log(this.dmChannels);
    });
  }

  selectCurrentChannel(channel) {
    this.currentChannel = channel;
    console.log(this.currentChannel)
  }

  getDirectMessages() {}
}
