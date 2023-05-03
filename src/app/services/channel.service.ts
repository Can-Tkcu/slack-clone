import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  channelId = '';
  channel: any = [];
  threadContent: any = [];
  threadContentIndex: number;
  currentChannelThread: any;
  currentChannel: any = [];
  public threadOpen: boolean = false;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore) { }

  getChannelDetails() {
    this.firestore
    .collection('channels')
    .doc(this.channelId)
    .valueChanges()
    .subscribe((channel: any) => {
      this.channel = channel;
      this.currentChannelThread = channel.thread;
      this.currentChannel = channel;
    });
  }

  openThread(index) {
    this.threadOpen = true;
    this.threadContent = this.channel.thread[index];
    this.threadContentIndex = index;
    // console.log(this.threadContent)
    // console.log(this.threadContentIndex)
  }
}
