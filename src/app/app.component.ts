import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewInit {
  private browserWidth = 0;
  private theme: String | null = '';
  private pageBody = document.body.classList;
  @ViewChild('menu') menu!: ElementRef;
  @ViewChild('outArea') outArea!: ElementRef;
  @ViewChild('light') light!: ElementRef;
  @ViewChild('dark') dark!: ElementRef;

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    console.log(this.light);
    console.log(this.menu);
    console.log(this.outArea);

    this.browserWidth = window.innerWidth;
    this.theme = localStorage.getItem('theme');

    window.onresize = () => {
      this.browserWidth = window.innerWidth;

      if (this.browserWidth >= 768) {
        this.menu.nativeElement.classList.remove('open-menu');
        this.outArea.nativeElement.classList.remove('open-menu');
      }
    };

    if (this.theme) {
      this.pageBody.add('dark-theme');
      this.light.nativeElement.classList.toggle('active');
      this.dark.nativeElement.classList.toggle('active');
    }
  }

  public toggleTheme() {
    this.pageBody.toggle('dark-theme');

    if (this.pageBody.contains('dark-theme'))
      localStorage.setItem('theme', 'dark-theme');
    else localStorage.removeItem('theme');

    this.light.nativeElement.classList.toggle('active');
    this.dark.nativeElement.classList.toggle('active');
  }

  public openMenu() {
    this.menu.nativeElement.classList.toggle('open-menu');
    this.outArea.nativeElement.classList.toggle('open-menu');
  }

  public closeMenu() {
    if (this.menu.nativeElement.classList.contains('open-menu')) {
      this.menu.nativeElement.classList.remove('open-menu');
      this.outArea.nativeElement.classList.remove('open-menu');
    }
  }
}
