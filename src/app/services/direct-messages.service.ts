import { Injectable, OnInit } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
@Injectable({
  providedIn: 'root',
})
export class DirectMessagesService implements OnInit {
  directMessageChannelID: string = '';
  dmChannels = [];
  public currentChannel = [];
  constructor(private afs: Firestore) {}

  async ngOnInit(): Promise<void> {
    await this.getChatsFromDb();
    this.setCurrentChannel();
    // console.log(this.currentChannel.length);
  }

  /**
   * Retrieves all chats from the data base
   */
  async getChatsFromDb() {
    const dmCollection = collection(this.afs, 'direct-messages');
    const dmChannel = collectionData(dmCollection, { idField: 'dmChannelId' });
    dmChannel.subscribe((chatsData) => {
      this.dmChannels = chatsData;
      this.currentChannel = [];
      this.currentChannel.push(this.dmChannels[0]);
      // console.log(this.currentChannel);
      // console.log(this.dmChannels);
    });
  }


  setCurrentChannel() {
    if (this.currentChannel.length == 1)
      localStorage.setItem(
        'currentChannel',
        JSON.stringify(this.currentChannel[0])
      );
  }


  selectCurrentChannel(channel) {
    this.currentChannel = [];
    this.currentChannel.push(channel);
    // console.log(this.currentChannel);
  }


  getDirectMessages() {}
}
