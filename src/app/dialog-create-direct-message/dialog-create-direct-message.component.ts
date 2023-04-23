import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-dialog-create-direct-message',
  templateUrl: './dialog-create-direct-message.component.html',
  styleUrls: ['./dialog-create-direct-message.component.scss']
})
export class DialogCreateDirectMessageComponent implements OnInit {
  myControl = new FormControl('');
  options: string[] = ['Max Musterman', 'Sarah Musterfrau', 'Felix Mustermann', 'Lisa Musterfrau'];
  filteredOptions: Observable<string[]> | undefined;

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
}
