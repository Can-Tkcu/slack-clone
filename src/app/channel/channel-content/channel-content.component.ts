import { Component, ElementRef, HostListener, OnInit, Query, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { ChannelService } from '../../services/channel.service';
import { UsersService } from '../../services/users.service';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
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
  sticky: boolean = false;
  @ViewChildren('stickyChip', { read: ElementRef }) chips: QueryList<ElementRef>;
  @ViewChildren('messages') messages: QueryList<any>
  @ViewChild('contentContainer') container: ElementRef;
  menuPosition: any;

  

  constructor(
    private route: ActivatedRoute,
    private firestore: AngularFirestore,
    public channelService: ChannelService,
    public usersService: UsersService) { }

  ngOnInit(): void {
    this.route.paramMap.pipe(untilDestroyed(this)).subscribe(paramMap => {
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
    this.chips.changes.pipe(untilDestroyed(this)).subscribe(() => {
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
    this.messages.changes.pipe(untilDestroyed(this)).subscribe(this.scrollToBottom);
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

  
}
