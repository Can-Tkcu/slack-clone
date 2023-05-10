import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { UsersService } from '../services/users.service';
import { ChannelService } from '../services/channel.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DirectMessagesService } from '../services/direct-messages.service';
import {
  EditorChangeContent,
  EditorChangeSelection,
} from 'ngx-quill/public-api';
import 'quill-emoji/dist/quill-emoji.js';
import { ActivatedRoute } from '@angular/router';
import { DirectMessagesContentComponent } from '../direct-message/direct-messages-content/direct-messages-content.component';
import { map } from 'rxjs';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss'],
})
export class TextboxComponent implements OnInit {
  public focusTextbox: boolean = false;
  public chatInput: any;
  @ViewChild('textMessage') textMessage!: ViewContainerRef;
  @ViewChild('chatBox') chatBox!: ElementRef;
  public textToUpload: any;
  public textBoxPlaceholder: any;
  public placeholder: any = 'Antworten ...';
  // @Input() editorRef: string;

  config = {
    // placeholder: 'Placeholder',
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['emoji'],
      ['link'],
    ],
    'emoji-toolbar': true,
    'emoji-textarea': false,
    'emoji-shortname': true,
    keyboard: {
      bindings: {
        enter: {
          key: 13,
          // ctrlKey: true,
          handler: () => {
            this.sendMessage();
          },
        },
      },
    },
  };

  constructor(
    private usersService: UsersService,
    public channelService: ChannelService,
    public dmService: DirectMessagesService,
    private firestore: AngularFirestore,
    public route: ActivatedRoute,
    private cdRef:ChangeDetectorRef
  ) {}


  ngOnInit(): void {

  }

  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  /**
   * Checks if user clicked into the chatbox and focuses the input + highlights the box
   * @param event mouseup on chatbox
   */
  @HostListener('document:mouseup', ['$event'])
  DocumentClick(event: Event) {
    // debugger;
    if (this.chatBox.nativeElement.contains(event.target)) {
      this.focusTextbox = true;
    } else {
      this.focusTextbox = false;
    }
    if (this.focusTextbox) {
      // console.log(typeof this.textMessage)
      // console.log(this.textMessage);
      // console.log(this.editorRef);
      // this.textMessage.nativeElement.focus();
      // document.querySelectorAll('.text-box #editor .ql-editor').forEach(box => {
      // document.querySelectorAll('.text-box').forEach(box => {
      //   // if(box.)
      //   console.log(box.parentElement.id);
      //   if (box.parentElement.id === 'text-content') {
      //     (box?.firstElementChild?.lastElementChild?.firstElementChild as HTMLElement)?.focus();
      //   }
      //   // else if (box.parentElement.id === 'text-thread') {
      //   //   (box?.firstElementChild?.lastElementChild?.firstElementChild as HTMLElement)?.focus();
      //   // }
      // });
      // document.querySelectorAll('.text-box').forEach(box => {
      //   if (box.classList.contains('active')) {
      //     (box?.firstElementChild?.lastElementChild?.firstElementChild as HTMLElement)?.focus();
      //   }
      // });
      // console.log(this.route.firstChild)
    }
  }

  checkRoute() {
    return this.route.firstChild.url['value'][0].path === 'channel';
  }

  showChannelPlaceholder() {
    if (this.chatBox?.nativeElement?.parentElement?.id == 'text-content') {
      return 'Nachricht an #' + this.channelService.channel.name;
    } else {
      return 'Antworten ...';
    } 
  }

  // showDirectMessagesPlaceholder() {
  //   // console.log(this.pipe.transform(this.dmService.currentChannelRecipient))
  //   return this.pipe.transform(this.dmService.currentChannelRecipient).pipe(
  //     map(displayName =>  'Nachricht an ' + displayName)
  //   );
  // }

  /**
   * function to get text and emojis of the editor
   * @param event - changes when content of editor changes
   */
  async getContent(event: EditorChangeContent | EditorChangeSelection) {
    if (event.event === 'text-change') {
      this.textToUpload = event.html;
    }
  }

  sendMessage() {
    if (this.route.firstChild.component == DirectMessagesContentComponent)
      this.sendDirectMessage();
    else this.renderChannelContent();

    document.querySelectorAll('.text-box').forEach((box) => {
      if (box.classList.contains('active')) {
        box.firstElementChild.lastElementChild.firstElementChild.innerHTML = '';
      }
    });
  }

  sendDirectMessage() {
    this.dmService.currentChannelPayload.push({
      author: this.usersService.currentUserData.uid,
      content: this.textToUpload ?? '',
      timestamp: Date.now(),
    });
    console.log(this.dmService.currentChannelData);

    this.firestore
      .collection('direct-messages')
      .doc(this.dmService.channelID)
      .update(this.dmService.currentChannelData);
  }

  updateChannelContent() {
    if (this.chatBox.nativeElement.parentElement.id == 'text-content') {
      this.channelService.currentChannelThread.push({
        author: this.usersService.currentUserData.uid,
        timestamp: Date.now(),
        message: this.textToUpload ?? '',
        replies: [],
      });
    } else if (this.chatBox.nativeElement.parentElement.id == 'text-thread') {
      this.channelService.currentChannelThread[
        this.channelService.threadContentIndex
      ].replies.push({
        author: this.usersService.currentUserData.uid,
        timestamp: Date.now(),
        message: this.textToUpload ?? '',
      });
    }
  }

  renderChannelContent() {
    this.updateChannelContent();

    this.firestore
      .collection('channels')
      .doc(this.channelService.channelId)
      .update(this.channelService.channel);
  }
}
