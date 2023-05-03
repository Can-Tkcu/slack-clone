import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateDirectMessageComponent } from '../dialog-create-direct-message/dialog-create-direct-message.component';
import { DirectMessagesService } from '../services/direct-messages.service';
import { UsersService } from '../services/users.service';
import { Firestore, collection } from '@angular/fire/firestore';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { collectionData } from '@angular/fire/firestore';

@Component({
  selector: 'app-direct-messages',
  templateUrl: './direct-messages.component.html',
  styleUrls: ['./direct-messages.component.scss'],
})
export class DirectMessagesComponent implements OnInit {
  collapsed = false;
  users = [];
  allDmChannels: Array<any>
  constructor(
    public dialog: MatDialog,
    public dmService: DirectMessagesService,
    public usersService: UsersService,
    public afs: AngularFirestore
  ) {}


  ngOnInit(): void {
    this.afs
      .collection('direct-messages')
      .valueChanges({idField: 'dmChannelId'})
      .subscribe((changes: any) => {
        this.allDmChannels = changes;
      //   this.allDmChannels.sort((a, b) => {
      //     if (a.users.recipientName.toLowerCase() < b.users.recipientName.toLowerCase()) {
      //       return -1;
      //     } else if (a.users.recipientName.toLowerCase() > b.users.recipientName.toLowerCase()) {
      //       return 1;
      //     } else {
      //       return 0;
      //     }
      //   });
      })
    setTimeout(() => {
     this.users = this.usersService.users 
    }, 1000);
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
