import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreadContentComponent } from './thread-content.component';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { provideFirestore } from '@angular/fire/firestore';
import { MatIconModule } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { GetUserNameByIdPipe } from '../get-user-name-by-id.pipe';
import { QuillModule } from 'ngx-quill';
import { FormsModule } from '@angular/forms';
import { ChannelService } from '../services/channel.service';
import { UsersService } from '../services/users.service';
import { ChannelContentComponent } from '../channel/channel-content/channel-content.component';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';

describe('ThreadContentComponent', () => {
  let component: ThreadContentComponent;
  let fixture: ComponentFixture<ThreadContentComponent>;
  let channelService = ChannelService
  let usersService = UsersService
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth()),
        RouterTestingModule,
        MatIconModule,
        QuillModule,
      ],
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
        {
          provide: ActivatedRoute,
          useValue: {},
        },
        channelService,
        

      ],
      declarations: [ThreadContentComponent, GetUserNameByIdPipe],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(ThreadContentComponent);
    channelService = TestBed.get(ChannelService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
