import { Component, OnInit } from '@angular/core';
import { DirectMessagesService } from '../services/direct-messages.service';

@Component({
  selector: 'app-direct-messages-content',
  templateUrl: './direct-messages-content.component.html',
  styleUrls: ['./direct-messages-content.component.scss'],
})
export class DirectMessagesContentComponent {


  /**
   *
   */
  constructor(public dmService: DirectMessagesService) {}

  getCurrentChannelData() {
  }

}
