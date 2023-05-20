import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectMessagesContentComponent } from './direct-messages-content.component';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { provideFirestore } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { GetUserNameByIdPipe } from 'src/app/get-user-name-by-id.pipe';

describe('DirectMessagesContentComponent', () => {
  let component: DirectMessagesContentComponent;
  let fixture: ComponentFixture<DirectMessagesContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth()),
        MatDialogModule
      ],
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of({paramMap: "FMp9Lazit4pS6V568W7U"})}
      }
      ],
      declarations: [ DirectMessagesContentComponent, GetUserNameByIdPipe ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DirectMessagesContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
