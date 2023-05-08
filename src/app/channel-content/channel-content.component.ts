import { Component, ElementRef, HostListener, OnInit, Query, QueryList, ViewChild, ViewChildren } from '@angular/core';
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
  // currentDate = Date.now();
  // getDayBeforeMidnightTime = new Date().setHours(-24, 0, 0, 0);
  // getLastMidnightTime = new Date().setHours(0, 0, 0, 0);
  // getNextMidnightTime = new Date().setHours(24, 0, 0, 0);
  // getNextNextMidnightTime = new Date().setHours(48, 0, 0, 0);
  messageDateString: any;
  sticky: boolean = false;
  @ViewChildren('stickyChip', { read: ElementRef }) chips: QueryList<ElementRef>;
  @ViewChildren('messages') messages: QueryList<any>
  @ViewChild('contentContainer') container: ElementRef;
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

  ngAfterViewInit() {
    // this.menuPosition = document.querySelectorAll('#sticky-chip').forEach(chip => {
    //   console.log(chip);
    //   this.menuPosition = (chip as HTMLElement)?.offsetTop
    // });
    // setTimeout(() => {
    //   this.menuPosition = this.menuElement.nativeElement;
    //   console.log('hallo')
    //   console.log(this.menuPosition)
    // }, 5000);
    this.chips.changes.subscribe(() => {
      let chip = this.chips.toArray().map(x => x.nativeElement.offsetTop);
      // console.log(chip);
      // this.menuPosition = chip;
      // chip.forEach((c) => {
      //   this.menuPosition = c;
      // })
      this.menuPosition = chip[0];
      // setInterval(() => {
      //   console.log(chip)
      // }, 1000)
    })
    // setInterval(() => {
    //   console.log(this.container.nativeElement.pageYOffset)
    // }, 1000)
    // console.log(window.pageYOffset)

    // this.chips.toArray()
    // .map(i=>{ console.log(i.nativeElement.offsetTop); })
    // console.log('hallo')
    // console.log(this.menuPosition)
    // console.log(this.menuElement.first)
    this.scrollToBottom();
    this.messages.changes.subscribe(this.scrollToBottom);
  }

  scrollToBottom = () => {
    try {
      this.container.nativeElement.scrollTop = this.container.nativeElement.scrollHeight;
    } catch (err) {}
  }


  // @HostListener('document:mousewheel', ['$event'])
  // handleScroll() {
  //   const windowScroll = window.pageYOffset;
  //   // console.log(window.pageYOffset)
  //   if (this.menuPosition === 0) {
  //     // debugger;
  //     console.log(this.menuPosition)
  //     // console.log(this.menuPosition)
  //     this.sticky = true;
  //   } else {
  //     this.sticky = false;
  //   }
  //   // console.log('scroll')
  //   // console.log(this.menuPosition)
  //   // console.log(this.container.nativeElement.scrollTop)
  // }

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
    let yesterday = dateYesterday.slice(0, dateToday.length - 5);

    const wholeDate = new Date(
      this.channelService.channel.thread[messageIndex].timestamp
    ).toLocaleDateString('de-DE', this.options);

    this.messageDateString = wholeDate.slice(0, wholeDate.length - 5);

    // this.menuElement.forEach(element => {

    // });
    // console.log(this.chips)
    // (this.menuElement.first as HTMLElement)?.classList.add('sticky');

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
