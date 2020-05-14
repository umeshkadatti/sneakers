import { Directive, ElementRef, Renderer2, OnInit, HostListener } from '@angular/core';

@Directive({
	selector: '[imageHover]'
})

export class HoverImageDirective implements OnInit{
	constructor(private elRef: ElementRef, private renderer: Renderer2){}

	ngOnInit(){
		this.elRef.nativeElement.src = '/../../assets/1_men_hover.jpg';
		this.elRef.nativeElement.style = "background-image: url('/../../assets/1_men_hover.jpg')";
	}

	color = 'green'
	hoverImageUrl = '/../../assets/1_men_hover.jpg';

	@HostListener('mouseenter') mousehover(eventData: Event){
		this.renderer.setStyle(this.elRef.nativeElement, 
			//'background-color', this.color);
			'background-image', this.hoverImageUrl);
	}
}