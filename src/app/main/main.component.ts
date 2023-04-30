import { Component } from '@angular/core';
import { ChannelService } from '../services/channel.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

constructor(public usersService: UsersService, public channelService: ChannelService) {
    
  }


ngOnInit(): void {
    this.usersService.getAllUsers()
    this.usersService.getCurrentUser()
  }
}
