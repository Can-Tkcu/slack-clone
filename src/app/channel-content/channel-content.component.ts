import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { ChannelService } from '../services/channel.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-channel-content',
  templateUrl: './channel-content.component.html',
  styleUrls: ['./channel-content.component.scss']
})
export class ChannelContentComponent implements OnInit {
  // channelId = '';
  // public channel: any = [];
  currentDate = Date.now();
  oneDayInMs: number = 86400000;
  getLastMidnightTime = new Date().setHours(0,0,0,0);
  getNextMidnightTime = new Date().setHours(24,0,0,0);
  getNextNextMidnightTime = new Date().setHours(48,0,0,0);


  constructor(
    private route: ActivatedRoute, 
    private firestore: AngularFirestore, 
    public channelService: ChannelService,
    public usersService: UsersService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.channelService.channelId = paramMap.get('id');
      // console.log('Got ID', this.channelService.channelId);
      this.channelService.getChannelDetails();
      // this.getDate(1683204940148)
      // this.getDate(this.currentDate);
      // console.log((this.currentDate - 1683204940148));
      // console.log(this.getLastMidnightTime);
      // this.getDate(this.getLastMidnightTime);
      // this.getDate(this.getNextMidnightTime);
      // this.getDate(this.getNextNextMidnightTime);
    });
  }

  getDate(timestamp) {
    let date = new Date(timestamp);
    console.log(date);
  }
  
}
