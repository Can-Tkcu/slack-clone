import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { ChannelService } from '../services/channel.service';

@Component({
  selector: 'app-channel-content',
  templateUrl: './channel-content.component.html',
  styleUrls: ['./channel-content.component.scss']
})
export class ChannelContentComponent implements OnInit {
  // channelId = '';
  // public channel: any = [];

  constructor(
    private route: ActivatedRoute, 
    private firestore: AngularFirestore, 
    public channelService: ChannelService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.channelService.channelId = paramMap.get('id');
      // console.log('Got ID', this.channelId);
      this.channelService.getChannelDetails();
    });
  }

  
}
