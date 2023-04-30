import { Component, OnInit } from '@angular/core';
import { DirectMessagesService } from '../services/direct-messages.service';

@Component({
  selector: 'app-direct-messages-content',
  templateUrl: './direct-messages-content.component.html',
  styleUrls: ['./direct-messages-content.component.scss'],
})
export class DirectMessagesContentComponent implements OnInit {
  /**
   *
   */
  constructor(public dmService: DirectMessagesService) {
  }
  ngOnInit(): void {
    let channel = localStorage.getItem('currentChannel')
    this.dmService.currentChannel = []
    this.dmService.currentChannel.push(JSON.parse(channel))
    console.log(this.dmService.currentChannel)
  }

  getCurrentChannelData() {}
}
