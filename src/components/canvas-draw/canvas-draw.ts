import { Component, ElementRef, ViewChild, Renderer, Input } from '@angular/core';
import { Platform } from 'ionic-angular';
 
@Component({
  selector: 'canvas-draw',
  templateUrl: 'canvas-draw.html'
})
export class CanvasDrawComponent {
 
    @ViewChild('myCanvas') canvas: ElementRef;
    @Input('background-img') bgImage;
 
    private _CANVAS: any;
    private _CONTEXT: any;

    canvasElement: any;
    lastX: number;
    lastY: number;
 
    currentColour: string = '#1abc9c';
    brushSize: number = 10;
 
    constructor(public platform: Platform, public renderer: Renderer) {
        console.log('Hello CanvasDraw Component');
    }
 
    ngAfterViewInit(){
 
        this.canvasElement = this.canvas.nativeElement;
        console.log("Background Image = " + this.bgImage);
        this.renderer.setElementAttribute(this.canvasElement, 'width', this.platform.width() + '');
        this.renderer.setElementAttribute(this.canvasElement, 'height', this.platform.height() + '');
        let background = new Image();
        background.src = this.bgImage;

        console.log("element width = " + this.canvasElement.width + ", height = " + this.canvasElement.height)

        background.onload = (() => {
            let hRatio = this.canvasElement.width / background.width;
            let vRatio = this.canvasElement.height / background.height;
            let ratio  = Math.min ( hRatio, vRatio );
            this._CONTEXT = this.canvasElement.getContext("2d");
            this._CONTEXT.drawImage(background, 0,0, background.width, background.height, 0,0,background.width*ratio, background.height*ratio)
        });
    }
 
    handleStart(ev){
 
        this.lastX = ev.touches[0].pageX;
        this.lastY = ev.touches[0].pageY;
    }
 
    handleMove(ev){
 
        let ctx = this.canvasElement.getContext('2d');
        let currentX = ev.touches[0].pageX;
        let currentY = ev.touches[0].pageY;
 
        ctx.beginPath();
        ctx.lineJoin = "round";
        ctx.moveTo(this.lastX, this.lastY);
        ctx.lineTo(currentX, currentY);
        ctx.closePath();
        ctx.strokeStyle = this.currentColour;
        ctx.lineWidth = this.brushSize;
        ctx.stroke();      
 
        this.lastX = currentX;
        this.lastY = currentY;
 
    }
}