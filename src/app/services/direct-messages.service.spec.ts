import { TestBed } from '@angular/core/testing';

import { DirectMessagesService } from './direct-messages.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { getFirestore } from 'firebase/firestore';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideFirestore } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';
import { MatDialogModule } from '@angular/material/dialog';

describe('DirectMessagesService', () => {
  let service: DirectMessagesService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth()),
        MatDialogModule
      ],
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
      ],
    });
    service = TestBed.inject(DirectMessagesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
