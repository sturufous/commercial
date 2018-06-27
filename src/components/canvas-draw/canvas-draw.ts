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
    @Input('pen-size') penSize = null;
    @Input('pen-colour') penColour = null;
 
    private _CONTEXT: any;

    canvasElement: any;
    lastX: number;
    lastY: number;
    background: any;
    ratio: number;
    dirty: boolean = false;

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
        this.drawBackground(this.bgImage);
    }

    drawBackground(bgImage) {

        if (bgImage === null) {
            bgImage = this.bgImage;
        }

        this.canvasElement = this.canvas.nativeElement;
        this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
        this.renderer.setElementAttribute(this.canvasElement, 'height',  this.platform.height() + '');
        let background = new Image();
        background.src = bgImage;

        background.onload = (() => {
            let hRatio = this.canvasElement.width / background.width;
            let vRatio = this.canvasElement.height / background.height;
            this.ratio  = Math.min ( hRatio, vRatio );
            console.log("Canvas width = " + this.canvasElement.width + " Canvas height = " + this.canvasElement.height + " Ratio = " + this.ratio);
            console.log("OffsetLeft = " + this.canvasElement.offsetLeft + ", OffsetTop = " + this.canvasElement.offsetTop)

            this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
            this.renderer.setElementAttribute(this.canvasElement, 'height', background.height*this.ratio + '');    

            this._CONTEXT = this.canvasElement.getContext("2d");
            this._CONTEXT.drawImage(background, 
                0, 
                0, 
                background.width, 
                background.height, 
                0, 
                0, 
                background.width*this.ratio, 
                background.height*this.ratio)
        });
    }

    handleStart(ev){
 
        if (!this.sharedData.drawingToggle) {
            var rect = ev.target.getBoundingClientRect();
            this.lastX = ev.touches[0].clientX-rect.x;
            this.lastY = ev.touches[0].clientY-rect.y;
        }
    }

    handleMove(ev){
 
        if (!this.sharedData.drawingToggle) {
            ev.preventDefault();
            this.dirty = true;
            var rect = ev.target.getBoundingClientRect();
            let currentX = ev.touches[0].clientX-rect.x;
            let currentY = ev.touches[0].clientY-rect.y; 
    
            this._CONTEXT.beginPath();
            this._CONTEXT.lineJoin = "round";
            this._CONTEXT.moveTo(this.lastX, this.lastY);
            this._CONTEXT.lineTo(currentX, currentY);
            this._CONTEXT.closePath();

            if (this.penColour !== null) {
                this._CONTEXT.strokeStyle = this.colourValues[this.penColour];
            } else {
                this._CONTEXT.strokeStyle = this.colourValues[this.sharedData.currentColour];
            }

            if (this.penSize !== null) {
                this._CONTEXT.lineWidth = this.penSize;
            } else {
                this._CONTEXT.lineWidth = this.sharedData.brushSize;
            }

            this._CONTEXT.stroke();  
    
            this.lastX = currentX;
            this.lastY = currentY;
        }
    }
}