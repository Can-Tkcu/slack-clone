import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateDirectMessageComponent } from '../dialog-create-direct-message/dialog-create-direct-message.component';

@Component({
  selector: 'app-direct-messages',
  templateUrl: './direct-messages.component.html',
  styleUrls: ['./direct-messages.component.scss']
})
export class DirectMessagesComponent {
  collapsed = false;

  constructor(public dialog: MatDialog) {     this.dialog.open(DialogCreateDirectMessageComponent);  }

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
