import { Component, ElementRef, HostListener, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { ChannelService } from '../services/channel.service';
import { UsersService } from '../services/users.service';

@Component({
  selector: 'app-channel-content',
  templateUrl: './channel-content.component.html',
  styleUrls: ['./channel-content.component.scss']
})
export class ChannelContentComponent implements OnInit {
  // channelId = '';
  // public channel: any = [];
  currentDate = Date.now();
  oneDayInMs: number = 86400000;
  getDayBeforeMidnightTime = new Date().setHours(-24, 0, 0, 0);
  getLastMidnightTime = new Date().setHours(0, 0, 0, 0);
  getNextMidnightTime = new Date().setHours(24, 0, 0, 0);
  getNextNextMidnightTime = new Date().setHours(48, 0, 0, 0);
  messageDateString: any;
  sticky: boolean = false;
  @ViewChildren('stickyChip') menuElement: ElementRef;
  menuPosition: any;

  options: any = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public channelService: ChannelService,
    public usersService: UsersService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.channelService.channelId = paramMap.get('id');
      // console.log('Got ID', this.channelService.channelId);
      this.channelService.getChannelDetails();
    });
  }

  // ngAfterViewInit() {
  //   this.menuPosition = this.menuElement.nativeElement.offsetTop;
  // }


  // @HostListener('window:scroll', ['$event'])
  //   handleScroll(){
  //       const windowScroll = window.pageYOffset;
  //       if(windowScroll >= this.menuPosition){
  //           this.sticky = true;
  //       } else {
  //           this.sticky = false;
  //       }
  //   }

  getDate(timestamp) {
    let date = new Date(timestamp);
    console.log(date);
  }

  isDifferentDay(messageIndex: number): boolean {
    if (messageIndex === 0) return true;

    const d1 = new Date(this.channelService.channel.thread[messageIndex - 1].timestamp);
    const d2 = new Date(this.channelService.channel.thread[messageIndex].timestamp);

    return (
      d1.getFullYear() !== d2.getFullYear() ||
      d1.getMonth() !== d2.getMonth() ||
      d1.getDate() !== d2.getDate()
    );
  }

  getMessageDate(messageIndex: number): string {
    let dateToday = new Date().toLocaleDateString('de-DE', this.options);
    let longDateYesterday = new Date();
    longDateYesterday.setDate(new Date().getDate() - 1);
    let dateYesterday = longDateYesterday.toLocaleDateString('de-DE', this.options);
    let today = dateToday.slice(0, dateToday.length - 5);
    let yesterday = dateYesterday.slice(0, dateToday.length - 2);

    const wholeDate = new Date(
      this.channelService.channel.thread[messageIndex].timestamp
    ).toLocaleDateString('de-DE', this.options);

    this.messageDateString = wholeDate.slice(0, wholeDate.length - 5);


    if (
      new Date(this.channelService.channel.thread[messageIndex].timestamp).getFullYear() ===
      new Date().getFullYear()
    ) {
      if (this.messageDateString === today) {
        return "Heute";
      } else if (this.messageDateString === yesterday) {
        return "Gestern";
      } else {
        return this.messageDateString;
      }
    } else {
      return wholeDate;
    }
  }
}
