import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateChannelComponent } from '../dialog-create-channel/dialog-create-channel.component';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent {
  collapsed = false;

  constructor(public dialog: MatDialog) { }

  openDialog() {
    this.dialog.open(DialogCreateChannelComponent);
  }

  toggleDropdown() {
    this.collapsed = !this.collapsed;
  }

}
