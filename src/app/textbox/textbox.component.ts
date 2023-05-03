import { Component, ElementRef, HostListener, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { UsersService } from '../services/users.service';
import { ChannelService } from '../services/channel.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DirectMessagesService } from '../services/direct-messages.service';
import { EditorChangeContent, EditorChangeSelection } from 'ngx-quill/public-api';
import 'quill-emoji/dist/quill-emoji.js';
// import '~quill/dist/quill.bubble.css'; 
// import '~quill/dist/quill.snow.css';


@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss'],
})
export class TextboxComponent {
  public focusTextbox: boolean = false;
  public chatInput: any;
  @ViewChild('textMessage') textMessage!: ViewContainerRef;
  @ViewChild('chatBox') chatBox!: ElementRef;
  public textToUpload: any;
  // @Input() editorRef: string;

  config = {
    // placeholder: 'Placeholder',
    toolbar: [
      ['bold', 'italic', 'underline', 'strike'],
      ['code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      ['emoji'],
      ['link']
    ],
    'emoji-toolbar': true,
    'emoji-textarea': false,
    'emoji-shortname': true,
    keyboard: {
      bindings: {
        ctrl_enter: {
          key: 13,
          ctrlKey: true,
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
    private dmService: DirectMessagesService,
    private firestore: AngularFirestore
  ) { }

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
    }
  }

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
    if (this.usersService.userSendsDm) this.sendDirectMessage();
    else this.renderChannelContent();

    document.querySelectorAll('.text-box').forEach(box => {
      if (box.classList.contains('active')) {
        box.firstElementChild.lastElementChild.firstElementChild.innerHTML = '';
      }
    });
  }

  sendDirectMessage() {
    // console.log(
    //  "payload:",this.dmService.currentChannelPayload,
    //  "users:", this.dmService.currentChannelUsers
    //  )

    this.dmService.currentChannelPayload.push({
      author: this.dmService.currentChannelUsers.senderName,
      content: this.chatInput,
      timestamp: Date.now(),
    });
    console.log(this.dmService.currentChannelData);

    this.firestore
      .collection('direct-messages')
      .doc(this.dmService.channelID)
      .update(this.dmService.currentChannelData)
      .then((result: any) => {
        console.log(result);
      });
  }

  updateChannelContent() {
    if (this.chatBox.nativeElement.parentElement.id == 'text-content') {
      this.channelService.currentChannelThread.push({
        author: this.usersService.currentUserData.displayName,
        authorPic: 'account_circle',
        timestamp: new Date().getTime(),
        message: this.textToUpload ?? '',
        replies: [],
      });
    } else if (this.chatBox.nativeElement.parentElement.id == 'text-thread') {
      this.channelService.currentChannelThread[this.channelService.threadContentIndex].replies.push({
        author: this.usersService.currentUserData.displayName,
        authorPic: 'account_circle',
        timestamp: new Date().getTime(),
        message: this.textToUpload ?? ''
      });
    }
  }

  renderChannelContent() {
    this.updateChannelContent();

    this.firestore
      .collection('channels')
      .doc(this.channelService.channelId)
      .update(this.channelService.currentChannel)
      .then((result: any) => {
        // console.log(result);
      });
  }
}
