import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UsersService } from '../services/users.service';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/compat/firestore';
import { DirectMessagesService } from '../services/direct-messages.service';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-dialog-create-direct-message',
  templateUrl: './dialog-create-direct-message.component.html',
  styleUrls: ['./dialog-create-direct-message.component.scss'],
})
export class DialogCreateDirectMessageComponent implements OnInit {
  myControl = new FormControl('');
  filteredOptions: Observable<string[]>;

  public dmForm: FormGroup;
  constructor(
    public usersService: UsersService,
    private afs: AngularFirestore,
    private dmService: DirectMessagesService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );

    this.dmForm = new FormGroup({
      displayName: new FormControl('', [Validators.required]),
      uid: new FormControl('', [Validators.required]),
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.usersService.users.filter((user) =>
      user.displayName.toLowerCase().includes(filterValue)
    );
  }

  async createDmChannel() {
    const channelRef: AngularFirestoreCollection = this.afs.collection('direct-messages');

    const channelData = {
      users: {
        senderID: this.usersService.currentUserData.uid,
        senderName: this.usersService.currentUserData.displayName,
        recipientID: this.dmForm.value.uid,
        recipientName: this.dmForm.value.displayName,
      },
      payload: {
        messages: [],
      },
    };

    const createdChannel = channelRef.add(channelData);
    return createdChannel && this.dialog.closeAll();
  }

  selectUserId(user) {
    this.dmForm.value.uid = user.uid;
  }
}
