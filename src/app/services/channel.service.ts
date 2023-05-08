import { Injectable, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from './users.service';


@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  channelId = '';
  channel: any = [];
  threadContent: any = [];
  threadContentIndex: number;
  currentChannelThread: any;
  // currentChannel: any = [];
  searchValue: string = '';
  public threadOpen: boolean = false;
  currentUserName: any;
  currentDate = Date.now();
  getDayBeforeMidnightTime = new Date().setHours(-24, 0, 0, 0);
  getLastMidnightTime = new Date().setHours(0, 0, 0, 0);
  getNextMidnightTime = new Date().setHours(24, 0, 0, 0);

  constructor(
    private route: ActivatedRoute, 
    private firestore: AngularFirestore,
    private usersService: UsersService
    ) { }

  getChannelDetails() {
    this.firestore
    .collection('channels')
    .doc(this.channelId)
    .valueChanges()
    .subscribe((channel: any) => {
      this.channel = channel;
      this.currentChannelThread = channel.thread;
      // console.log(channel)
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
