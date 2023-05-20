import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateChannelComponent } from './dialog-create-channel.component';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { provideFirestore } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';

describe('DialogCreateChannelComponent', () => {
  let component: DialogCreateChannelComponent;
  let fixture: ComponentFixture<DialogCreateChannelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth()),
        MatDialogModule,
        MatIconModule,
        FormsModule
      ],
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
      ],
      declarations: [ DialogCreateChannelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCreateChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
