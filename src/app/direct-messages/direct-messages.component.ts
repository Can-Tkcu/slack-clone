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
  
  constructor(
    public dialog: MatDialog,
    public dmService: DirectMessagesService,
    public usersService: UsersService,
    public afs: Firestore
  ) {}


  ngOnInit(): void {
    // this.dmService.getDirectMessages();
    // this.dmService.getChatsFromDb()
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
