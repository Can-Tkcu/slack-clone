import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { ChannelService } from '../services/channel.service';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';
import ResizeObserver from 'resize-observer-polyfill';
import { MatSidenav } from '@angular/material/sidenav';
import { SidebarService } from '../services/sidebar.service';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  public currentRoute: any;
  public innerWidth: any;
  public responsiveView: boolean;
  private responsiveNav: boolean = false;
  private screenWidth: any;
  @ViewChild('channelContent') content: ElementRef;
  @ViewChild('drawer') public sidenav: MatSidenav;

  constructor(
    public usersService: UsersService,
    public channelService: ChannelService,
    private router: Router,
    private sidenavService: SidebarService
  ) {

  }

  ngOnInit(): void {
    this.usersService.getAllUsers();
    this.usersService.getCurrentUser();
    this.sidenavService.getValue().subscribe((value) => {
      this.responsiveView = value;
    })
    // this.screenWidth = window.innerWidth;
  }

  ngAfterViewInit() {
    this.elementObserver();
    this.sidenavService.setSidenav(this.sidenav);
  }

  checkRoute() {
    return this.router.url === '/home' ||
      this.router.url === '/home/threads-list' ||
      this.router.url === '/home/user-list'
      ? false
      : true;
  }

  @HostListener('document:mouseup', ['$event'])
  DocumentClick(event: Event) {
    // debugger;
    // console.log(this.sidenav._content.nativeElement.contains(event.target as HTMLElement))
    if (!this.sidenav._content.nativeElement.contains(event.target as HTMLElement) && this.responsiveView) {
      this.sidenav.close();
    } else {
      // debugger;
      // console.log(this.responsiveView)
      this.sidenav.open();
    }
  }

  // @HostListener('window:resize', ['$event'])
  // onResize(event) {

  //   this.screenWidth = window.innerWidth;

  //   // this.screenHeight = window.innerHeight;

  // }


  elementObserver() {
    let ro = new ResizeObserver(entries => {
      for (let entry of entries) {
        const cr = entry.contentRect;
        // console.log('Element:', entry.target);
        // console.log(`Element size: ${cr.width}px x ${cr.height}px`);
        // console.log(`Element padding: ${cr.top}px ; ${cr.left}px`);
        // console.log($event);
        // if (cr.width <= 693 && window.innerWidth <= 800) {
        //   document.querySelectorAll('.answers').forEach((el) => {
        //     (el as HTMLElement).style.width = '100%';
        //   });
        //   // this.sidenavService.responsiveView = true;
        //   this.sidenavService.setValue(true);
        //   this.sidenav.mode = 'over';
        //   this.sidenav.close();
        //   // console.log(this.sidenavService.responsiveView)
        // } else if (cr.width >= 800) {
        //   // debugger;
        //   this.sidenavService.setValue(false);
        //   this.sidenav.mode = 'side';
        //   this.sidenav.open();
        // }

        if (window.innerWidth <= 800 || cr.width <= 400 && this.channelService.threadOpen) {
          console.log(window.innerWidth)
          this.sidenavService.setValue(true);
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else if (cr.width <= 693) {
          // debugger;
          // this.sidenavService.responsiveView = true;
          
          // console.log(this.sidenavService.responsiveView)
          console.log('Answers wird geändert')
          document.querySelectorAll('.answers').forEach((el) => {
            (el as HTMLElement).style.width = '100%';
          });
        } else {
          // debugger;
          this.sidenavService.setValue(false);
          this.sidenav.mode = 'side';
          this.sidenav.open();
          document.querySelectorAll('.answers').forEach((el) => {
            (el as HTMLElement).style.width = '600px';
          });
        }


        // if (cr.width <= 800 && window.innerWidth >= 800) {
        //   // debugger;
        //   console.log(window.innerWidth)
        //   this.sidenavService.setValue(false);
        //   this.sidenav.mode = 'side';
        //   this.sidenav.open();
        //   // console.log(this.sidenav)
        // } else {
        //   document.querySelectorAll('.answers').forEach((el) => {
        //     (el as HTMLElement).style.width = '100%';
        //   });
        //   // this.sidenavService.responsiveView = true;
        //   this.sidenavService.setValue(true);
        //   this.sidenav.mode = 'over';
        //   this.sidenav.close();
        //   // console.log(this.sidenavService.responsiveView)
        // }
      }
    });

    // Element for which to observe height and width 
    ro.observe(this.content.nativeElement);
  }
}
