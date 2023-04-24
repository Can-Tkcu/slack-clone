import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';

@Component({
  selector: 'app-textbox',
  templateUrl: './textbox.component.html',
  styleUrls: ['./textbox.component.scss']
})
export class TextboxComponent {
  public focusTextbox: boolean = false;
  public chatInput2: any;
  @ViewChild('chatInput') chatInput!: ElementRef;
  @ViewChild('chatBox') chatBox!: ElementRef;


  /**
   * Checks if user clicked into the chatbox and focuses the input + highlights the box
   * @param event mouseup on chatbox
   */
  @HostListener('document:mouseup', ['$event'])
  DocumentClick(event: Event) {
    // debugger;
    if (this.chatBox.nativeElement.contains(event.target)) {
      this.focusTextbox = true;
      // console.log("inside");
    } else {
      this.focusTextbox = false;
      // console.log("outside");
    }
    if (this.focusTextbox) {
      this.chatInput.nativeElement.focus();
    }
  }

  bold() {
    this.chatInput.nativeElement.style.fontWeight = 'bold';
    console.log(this.chatInput.nativeElement.style);
  }

  italic() {
    this.chatInput.nativeElement.style.fontStyle = 'italic';
    // console.log(this.chatInput.nativeElement.style);
  }

  strikeThrough() {
    this.chatInput.nativeElement.style.textDecoration = 'line-through';
  }

  listNumbered() {
    // this.chatInput.nativeElement.style.listStyle = 'decimal';
    // this.chatInput.nativeElement.innerHTML = '<ul><li></li></ul>'
    // console.log(this.chatInput.nativeElement.style.listStyle);
  }

  listDot() {

  }
}
