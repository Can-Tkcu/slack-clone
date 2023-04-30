import { Component } from '@angular/core';
import { ChannelContentComponent } from '../channel-content/channel-content.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ChannelService } from '../services/channel.service';

@Component({
  selector: 'app-thread-content',
  templateUrl: './thread-content.component.html',
  styleUrls: ['./thread-content.component.scss']
})
export class ThreadContentComponent {
  // channels_ = [];

  constructor(public channelService: ChannelService) { }

}