import { Component, ElementRef, ViewChild, Renderer, Input } from '@angular/core';
import { Platform } from 'ionic-angular';
import { ShareProvider } from '../../providers/share/share';
 
@Component({
  selector: 'canvas-draw',
  templateUrl: 'canvas-draw.html'
})
export class CanvasDrawComponent {
 
    @ViewChild('myCanvas') canvas: ElementRef;
    @Input('background-img') bgImage;
 
    private _CONTEXT: any;

    canvasElement: any;
    lastX: number;
    lastY: number;
    background: any;
    ratio: number;

    colourValues = {
        primary: '#488aff',
        secondary: '#32db64',
        danger: '#f53d3d',
        dark: '#222'
      }    
  
    constructor(public platform: Platform, 
        public renderer: Renderer,
        public sharedData: ShareProvider) {
        console.log('Hello CanvasDraw Component');
    }
 
    ngAfterViewInit(){
 
        this.canvasElement = this.canvas.nativeElement;
        this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
        this.renderer.setElementAttribute(this.canvasElement, 'height',  this.platform.height() + '');
        this.background = new Image();
        this.background.src = this.bgImage;

        this.background.onload = (() => {
            let hRatio = this.canvasElement.width / this.background.width;
            let vRatio = this.canvasElement.height / this.background.height;
            this.ratio  = Math.min ( hRatio, vRatio );
            console.log("Canvas width = " + this.canvasElement.width + " Canvas height = " + this.canvasElement.height + " Ratio = " + this.ratio);

            this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
            this.renderer.setElementAttribute(this.canvasElement, 'height', this.background.height*this.ratio + '');    

            this._CONTEXT = this.canvasElement.getContext("2d");
            this._CONTEXT.drawImage(this.background, 
                0, 
                0, 
                this.background.width, 
                this.background.height, 
                0, 
                0, 
                this.background.width*this.ratio, 
                this.background.height*this.ratio)
        });
    }

    redrawBgImage() {
        this._CONTEXT.drawImage(this.background, 
            0, 
            0, 
            this.background.width, 
            this.background.height, 
            0, 
            0, 
            this.background.width*this.ratio, 
            this.background.height*this.ratio)
    }
 
    handleStart(ev){
 
        if (!this.sharedData.drawingToggle) {
            this.lastX = ev.touches[0].pageX-10;
            this.lastY = ev.touches[0].pageY-65;
        }
    }
 
    handleMove(ev){
 
        if (!this.sharedData.drawingToggle) {
            let ctx = this.canvasElement.getContext('2d');
            let currentX = ev.touches[0].pageX-10;
            let currentY = ev.touches[0].pageY-65; // Remove height of toolbar
    
            ctx.beginPath();
            ctx.lineJoin = "round";
            ctx.moveTo(this.lastX, this.lastY);
            ctx.lineTo(currentX, currentY);
            ctx.closePath();
            ctx.strokeStyle = this.colourValues[this.sharedData.currentColour];
            ctx.lineWidth = this.sharedData.brushSize;
            ctx.stroke();      
    
            this.lastX = currentX;
            this.lastY = currentY;
        }
    }
}