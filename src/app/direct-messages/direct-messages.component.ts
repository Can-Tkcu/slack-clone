import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateDirectMessageComponent } from '../dialog-create-direct-message/dialog-create-direct-message.component';
import { DirectMessagesService } from '../services/direct-messages.service';
import { UsersService } from '../services/users.service';
import { Firestore, collection } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collectionData } from '@angular/fire/firestore';
import { ChannelService } from '../services/channel.service';
import { GetUserNameByIdPipe } from '../get-user-name-by-id.pipe';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-direct-messages',
  templateUrl: './direct-messages.component.html',
  styleUrls: ['./direct-messages.component.scss'],
})
export class DirectMessagesComponent implements OnInit {
  collapsed = false;
  users = [];
  allDmChannels: Array<any> = []
  status$: boolean;
  constructor(
    public dialog: MatDialog,
    public dmService: DirectMessagesService,
    public usersService: UsersService,
    public afs: AngularFirestore,
    public channelService: ChannelService
  ) {}


  ngOnInit(): void {
    this.afs
      .collection('direct-messages')
      .valueChanges({idField: 'dmChannelId'})
      .subscribe((channels: any) => {
        this.allDmChannels = []
        channels.forEach(channel => {
          if(channel.users.senderID == this.usersService.currentUserDataID)
          
          this.allDmChannels.push(channel);
          this.allDmChannels.sort((a, b) => {
            if (a.users.recipientName.toLowerCase() < b.users.recipientName.toLowerCase()) {
              return -1;
            } else if (a.users.recipientName.toLowerCase() > b.users.recipientName.toLowerCase()) {
              return 1;
            } else {
              return 0;
            }
          });
        });
      })
    setTimeout(() => {
     this.users = this.usersService.users 
    }, 500);
  }


  openDialog() {
    this.dialog.open(DialogCreateDirectMessageComponent);
  }


  toggleDropdown() {
    this.collapsed = !this.collapsed;
  }


  public btnMessage() {
    console.log('Creating new direct message');
  }
}
