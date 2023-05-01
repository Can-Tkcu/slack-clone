import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { UsersService } from '../services/users.service';
import { ChannelService } from '../services/channel.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { DirectMessagesService } from '../services/direct-messages.service';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss'],
})
export class TextboxComponent {
  public focusTextbox: boolean = false;
  public chatInput: any;
  @ViewChild('textMessage') textMessage!: ElementRef;
  @ViewChild('chatBox') chatBox!: ElementRef;
  allThreads: any = [];

  constructor(
    private usersService: UsersService,
    private channelService: ChannelService,
    private dmService: DirectMessagesService,
    private firestore: AngularFirestore
  ) {}

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
      this.textMessage.nativeElement.focus();
    }
  }

  bold() {
    this.textMessage.nativeElement.style.fontWeight = 'bold';
    console.log(this.textMessage.nativeElement.style);
  }

  italic() {
    this.textMessage.nativeElement.style.fontStyle = 'italic';
    // console.log(this.textMessage.nativeElement.style);
  }

  strikeThrough() {
    this.textMessage.nativeElement.style.textDecoration = 'line-through';
  }

  listNumbered() {
    // this.textMessage.nativeElement.style.listStyle = 'decimal';
    // this.textMessage.nativeElement.innerHTML = '<ul><li></li></ul>'
    // console.log(this.textMessage.nativeElement.style.listStyle);
  }

  listDot() {}

  sendMessage() {
    if (this.usersService.userSendsDm == true) this.sendDirectMessage();
    else this.renderChannelContent();

    this.chatInput = '';
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
    if (this.channelService.channel.thread) {
      this.allThreads = this.channelService.channel.thread;
    } else {
      this.allThreads = [];
    }
    if (this.chatBox.nativeElement.parentElement.id == 'text-content') {
      this.allThreads.push({
        author: this.usersService.currentUserData.displayName,
        authorPic: 'account_circle',
        timestamp: new Date().getTime(),
        message: this.chatInput,
        replies: [],
      });
    }
  }

  updateReplies() {
    if (this.channelService.threadContent != 0) {
      this.allThreads[this.channelService.threadContentIndex].replies =
        this.channelService.threadContent.replies;
    } else {
      this.allThreads[this.channelService.threadContentIndex].replies = [];
    }
    if (this.chatBox.nativeElement.parentElement.id == 'text-thread') {
      this.channelService.threadContent.replies.push({
        author: this.usersService.currentUserData.displayName,
        authorPic: 'account_circle',
        timestamp: new Date().getTime(),
        message: this.chatInput,
      });
    }
  }

  renderChannelContent() {
    this.updateChannelContent();
    this.updateReplies();

    this.firestore
      .collection('channels')
      .doc(this.channelService.channelId)
      .update({
        name: this.channelService.channel.name,
        thread: this.allThreads,
      })
      .then((result: any) => {
        console.log(result);
        console.log(this.firestore.collection(this.channelService.channelId));
        console.log(this.allThreads);
      });
  }
}
