import { TestBed } from '@angular/core/testing';
import { UsersService } from './users.service';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { provideFirestore } from '@angular/fire/firestore';
import { getFirestore } from 'firebase/firestore';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { provideAuth } from '@angular/fire/auth';
import { getAuth } from 'firebase/auth';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth()),
      ],
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
      ],
    });
    service = TestBed.inject(UsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
