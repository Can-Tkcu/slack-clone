import { Component } from '@angular/core';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent {
  collapsed = false;

  toggleDropdown() {
    this.collapsed = !this.collapsed;
  }

  public btnChannel() {
    console.log('Creating new Channel');
  }

}
