import { Component } from '@angular/core';
import { DirectMessagesService } from '../services/direct-messages.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {


  constructor(public dmService: DirectMessagesService, public usersService: UsersService) {}

  async getId() {
    setTimeout(() => {
      return console.log(this.dmService.selectedChannelID)
      
    }, 125);
  }
}
