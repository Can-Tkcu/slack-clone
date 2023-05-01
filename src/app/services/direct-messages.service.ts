import { Injectable, OnInit } from '@angular/core';
import {
  CollectionReference,
  DocumentData,
  DocumentReference,
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
} from '@angular/fire/firestore';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class DirectMessagesService implements OnInit {
  directMessageChannelID: string = '';
  dmChannels = [];
  currentChannelMessages: any;
  dmCollection: CollectionReference;
  currentChannelRecipient: any;
  

  constructor(private afs: Firestore, private route: Router) {
    this.dmCollection = collection(this.afs, 'direct-messages');
  }


  async ngOnInit(): Promise<void> {
   const url = this.route.url
   const id = url.split('/').pop();
   this.selectCurrentChannel(id)
   await this.getChatsFromDb();
      
    
    // console.log(this.currentChannel.length);
  }


  /**
   * Retrieves all chats from the data base
   */
  async getChatsFromDb() {
    const dmChannel = collectionData(this.dmCollection, {
      idField: 'dmChannelId',
    });

    dmChannel.subscribe((chatsData) => {
      this.dmChannels = chatsData;
      console.log(this.dmChannels);
    });
    
  }

  // setCurrentChannel() {
  //   if (this.currentChannel.length == 1)
  //     localStorage.setItem(
  //       'currentChannel',
  //       JSON.stringify(this.currentChannel)
  //     );
  // }

  async selectCurrentChannel(channelID) {
    const dmDocRef = doc(this.dmCollection, channelID);
  
    docData(dmDocRef).subscribe((channelData: any) => {
      this.currentChannelMessages = channelData.payload.messages
      this.currentChannelRecipient = channelData.users.recipientName
    });
  }

  
}
