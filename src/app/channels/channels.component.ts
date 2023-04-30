import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogCreateChannelComponent } from '../dialog-create-channel/dialog-create-channel.component';
import { Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ChannelService } from '../services/channel.service';

@Component({
  selector: 'app-channels',
  templateUrl: './channels.component.html',
  styleUrls: ['./channels.component.scss']
})
export class ChannelsComponent implements OnInit {
  collapsed = false;
  channels$: Observable<any>;
  allChannel: Array<any>;

  constructor(
    public dialog: MatDialog, 
    private firestore: AngularFirestore,
    public channelService: ChannelService) { }

  ngOnInit(): void {
    this.firestore
      .collection('channels')
      .valueChanges({idField: 'channelId'})
      .subscribe((changes: any) => {
        // console.log('Received changes from DB', changes);
        this.allChannel = changes;
        this.allChannel.sort((a, b) => {
          if (a.name.toLowerCase() < b.name.toLowerCase()) {
            return -1;
          } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
            return 1;
          } else {
            return 0;
          }
        });
      })
  }
  // constructor(public dialog: MatDialog, firestore: Firestore) {
  //   const coll = collection(firestore, 'channels');
  //   this.channels$ = collectionData(coll);

  //   this.channels$.subscribe((newChannels) => {
  //     console.log('Channels sind:', newChannels);
  //     this.allChannel = newChannels;
  //     this.allChannel.sort((a, b) => {
  //       if (a.name.toLowerCase() < b.name.toLowerCase()) {
  //         return -1;
  //       } else if (a.name.toLowerCase() > b.name.toLowerCase()) {
  //         return 1;
  //       } else {
  //         return 0;
  //       }
  //     });
  //   });
  // }

  openDialog() {
    this.dialog.open(DialogCreateChannelComponent);
  }

  toggleDropdown() {
    this.collapsed = !this.collapsed;
  }

}
