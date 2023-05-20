import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChannelContentComponent } from './channel-content.component';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { provideFirestore } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { untilDestroyed } from '@ngneat/until-destroy';
import { of } from 'rxjs';

describe('ChannelContentComponent', () => {
  let component: ChannelContentComponent;
  let fixture: ComponentFixture<ChannelContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth()),
        RouterTestingModule,
        MatIconModule
        
      ],
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
        {
          provide: ActivatedRoute,
          useValue: { paramMap: of({paramMap: "ZI5JKAHpMbvDSyETO5W3"})}
      }
      ],
      declarations: [ ChannelContentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChannelContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
function subscribe() {
  throw new Error('Function not implemented.');
}

