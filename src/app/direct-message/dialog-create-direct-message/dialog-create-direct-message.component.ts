import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { UsersService } from '../../services/users.service';
import { DirectMessagesService } from '../../services/direct-messages.service';
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
    public dmService: DirectMessagesService
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

  selectUserId(user) {
    this.dmForm.value.uid = user.uid;
  }
}
