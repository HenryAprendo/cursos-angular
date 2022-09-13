import { Component, Input, Output, OnInit, EventEmitter, OnChanges, SimpleChanges, OnDestroy, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-img',
  templateUrl: './img.component.html',
  styleUrls: ['./img.component.scss']
})
export class ImgComponent implements OnInit, OnChanges, OnDestroy, AfterViewInit {
  img: string = '';

  // eslint-disable-next-line @angular-eslint/no-input-rename
  @Input('img')
  set changeImg(newImg: string) {
    this.img = newImg;
    console.log('change just img => ', this.img);
  }

  @Input() alt: string = '';
  @Output() loaded = new EventEmitter<string>();

  imageDefault: string = 'https://raw.githubusercontent.com/platzi/angular-componentes/2-step/src/assets/images/default.png';
  // counter = 0;
  // counterFn: number | undefined;

  constructor() {
    //before render
    console.log('constructor', 'imgValue => ', this.img);
  }

  ngOnInit(): void {
    //before render
    //async-fetch -- once time
    // this.counterFn = window.setInterval( () => {
    //   this.counter += 1;
    //   console.log('run counter');
    // }, 1000)

    console.log('ngOnInit', 'imgValue => ', this.img);
  }

  ngOnChanges(changes: SimpleChanges): void {
    //before - during render
    //changes inputs -- times
    console.log('ngOnChanges', 'imgValue => ', this.img);
    console.log('changes: ', changes);
  }

  ngAfterViewInit(): void {
    //after-render
    console.log('AfterViewInit');
  }

  ngOnDestroy(): void {
    //Delete component
    console.log('ngOnDestroy');
    // window.clearInterval(this.counterFn);
  }



  imgError() {
    this.img = this.imageDefault;
  }

  imgLoaded() {
    console.log('Log hijo');
    this.loaded.emit(this.img);
  }

}
