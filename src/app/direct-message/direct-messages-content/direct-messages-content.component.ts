import { Component, OnInit } from '@angular/core';
import { DirectMessagesService } from '../../services/direct-messages.service';
import { ActivatedRoute } from '@angular/router';
import { UsersService } from '../../services/users.service';
import { ChannelService } from 'src/app/services/channel.service';

@Component({
  selector: 'app-direct-messages-content',
  templateUrl: './direct-messages-content.component.html',
  styleUrls: ['./direct-messages-content.component.scss'],
})
export class DirectMessagesContentComponent implements OnInit {
  currMessages: any;

  constructor(
    public dmService: DirectMessagesService,
    private route: ActivatedRoute,
    public usersService: UsersService,
    public channelService: ChannelService
  ) {}

  async ngOnInit(): Promise<void> {
    this.route.paramMap.subscribe((paramMap) => {
      this.dmService.channelID = paramMap.get('id');
      this.dmService.getChatsFromDb();
      // this.dmService.getAllDms()
    });
  }
}
