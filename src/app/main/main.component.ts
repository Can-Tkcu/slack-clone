import { Component } from '@angular/core';
import { ChannelService } from '../services/channel.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor(public channelService: ChannelService) {}
}
