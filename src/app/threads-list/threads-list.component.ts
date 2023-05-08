import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { UsersService } from '../services/users.service';
import { ChannelService } from '../services/channel.service';

@Component({
  selector: 'app-threads-list',
  templateUrl: './threads-list.component.html',
  styleUrls: ['./threads-list.component.scss']
})
export class ThreadsListComponent implements OnInit {
  allChannels: any = [];
  // public ownChannels: any = []
  ownThreads: any = [];
  public channelNames: any = [];

  constructor(
    private firestore: AngularFirestore,
    public usersService: UsersService,
    public channelService: ChannelService
  ) { }

  ngOnInit() {
    this.firestore
    .collection('channels')
    .valueChanges({idField: 'channelId'})
    .subscribe((channels: any) => {
      // console.log(channels)
      this.allChannels = channels;
      this.getOwnThreads();
    })
  }

  getOwnThreads() {
    this.ownThreads = [];
    // this.ownChannels = [];
    this.allChannels.forEach(e => {
      e.thread?.forEach(element => {
        // console.log(e)
        // console.log(element)
        if (element.author.match(this.usersService.currentUserDataID)) {
          this.ownThreads.push(element);
          this.channelNames.push(e.name);
          this.ownThreads.sort(function (x, y) {
            return y.timestamp - x.timestamp;
          });

        }
      });
      
    });
  }
}