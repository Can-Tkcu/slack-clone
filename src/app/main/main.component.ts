import { Component, OnInit } from '@angular/core';
import { ChannelService } from '../services/channel.service';
import { UsersService } from '../services/users.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  public currentRoute: any;

constructor(
  public usersService: UsersService, 
  public channelService: ChannelService,
  private router: Router
  ) {
    
  }


ngOnInit(): void {
    this.usersService.getAllUsers()
    this.usersService.getCurrentUser()
  }

  checkRoute() {
    return (this.router.url === '/home' || this.router.url === '/home/threads-list') ? false : true;
  }
}
