import { Component, OnInit } from '@angular/core';
import { DirectMessagesService } from '../services/direct-messages.service';

@Component({
  selector: 'app-direct-messages-content',
  templateUrl: './direct-messages-content.component.html',
  styleUrls: ['./direct-messages-content.component.scss'],
})
export class DirectMessagesContentComponent implements OnInit {
  currMessages: any;

  constructor(public dmService: DirectMessagesService) {}

  async ngOnInit(): Promise<void> {
    // setInterval(() => {
    //   this.currMessages = this.dmService.currentChannel
    //   console.log(this.currMessages)
      
    // }, 500)
    // let channel = localStorage.getItem('currentChannel');
    // this.dmService.currentChannel = [];
    // this.dmService.currentChannel.push(JSON.parse(channel));
    // this.getCurrentChannelData();
    // console.log(this.currMessages);
  }

  // getCurrentChannelData() {
  // setInterval(() => {
  // console.log(this.dmService.currentChannel$);
  // }, 1000);
  // this.dmService.currentChannel$.subscribe(() => {});
  // }
}
