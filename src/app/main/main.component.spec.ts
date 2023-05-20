import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainComponent } from './main.component';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { provideFirestore } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { of } from 'rxjs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { ChannelsComponent } from '../channel/channels/channels.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DirectMessagesComponent } from '../direct-message/direct-messages/direct-messages.component';
import { MatMenuModule } from '@angular/material/menu';
import { TextboxComponent } from '../textbox/textbox.component';
import { QuillModule } from 'ngx-quill';
import { GetUserNameByIdPipe } from '../get-user-name-by-id.pipe';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('MainComponent', () => {
  let component: MainComponent;
  let fixture: ComponentFixture<MainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth()),
        MatSidenavModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatDialogModule,
        RouterModule,
        MatMenuModule,
        QuillModule,
        RouterTestingModule.withRoutes([]),
        HttpClientModule,
        MatSidenavModule,
      ],
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
        {
          provide: ActivatedRoute,
          useValue: {
            firstChild: { url: { value: { [0]: { path: 'channel' } } } },
          },
        },
      ],
      declarations: [
        MainComponent,
        ChannelsComponent,
        DirectMessagesComponent,
        TextboxComponent,
        GetUserNameByIdPipe,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
