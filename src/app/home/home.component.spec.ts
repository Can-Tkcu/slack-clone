import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';
import { provideFirestore } from '@angular/fire/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { environment } from 'src/environments/environment';
import { MatDialogModule } from '@angular/material/dialog';
import { HomeHeaderComponent } from '../home-header/home-header.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { MainComponent } from '../main/main.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChannelsComponent } from '../channel/channels/channels.component';
import { DirectMessagesComponent } from '../direct-message/direct-messages/direct-messages.component';
import { RouterTestingModule } from '@angular/router/testing';
import { GetUserNameByIdPipe } from '../get-user-name-by-id.pipe';
import { TextboxComponent } from '../textbox/textbox.component';
import { QuillModule } from 'ngx-quill';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideFirestore(() => getFirestore()),
        provideAuth(() => getAuth()),
        MatDialogModule,
        MatToolbarModule,
        MatIconModule,
        FormsModule,
        MatMenuModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        QuillModule
      ],
      providers: [
        { provide: FIREBASE_OPTIONS, useValue: environment.firebase },
        {
          provide: ActivatedRoute,
          useValue: {  firstChild: { url: { value: { [0]: { path: {} } } } },}
      }
      ],
      declarations: [ HomeComponent, HomeHeaderComponent, MainComponent,ChannelsComponent, DirectMessagesComponent, GetUserNameByIdPipe, TextboxComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
