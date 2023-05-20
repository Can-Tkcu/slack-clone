import { TestBed } from '@angular/core/testing';
import { provideStorage } from '@angular/fire/storage';
import { getStorage } from 'firebase/storage';
import { UserImageService } from './user-image.service';
import { provideFirebaseApp } from '@angular/fire/app';
import { initializeApp } from 'firebase/app';
import { environment } from 'src/environments/environment';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

describe('UserImageService', () => {
  let service: UserImageService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [provideFirebaseApp(() => initializeApp(environment.firebase)), provideStorage(() => getStorage())],
      providers: [],
    });
    service = TestBed.inject(UserImageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
