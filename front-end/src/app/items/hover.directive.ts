import { Directive,  ElementRef } from '@angular/core';

//import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
//import {BrowserModule} from '@angular/platform-browser';

@Directive({
  selector: '[appHover]'
})
export class HoverDirective {

	constructor(el: ElementRef) {
	//constructor(el: ElementRef, private renderer: Renderer) {
    	el.nativeElement.style.backgroundColor = 'yellow';
    	// renderer.setElementStyle(el.nativeElement, 'backgroundColor', 'gray');
	}
}
