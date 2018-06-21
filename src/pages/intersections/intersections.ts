import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides } from 'ionic-angular';
import { CanvasDrawComponent } from '../../components/canvas-draw/canvas-draw';
import { PopoverController } from 'ionic-angular';
import { GraphicToolsPage } from '../../pages/graphic-tools/graphic-tools';
import { ShareProvider } from '../../providers/share/share';

/**
 * Generated class for the IntersectionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-intersections',
  templateUrl: 'intersections.html',
})

export class IntersectionsPage {

  @ViewChild('intersectionSlider') slider: Slides;
  canvasComp: CanvasDrawComponent;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public popoverCtrl: PopoverController,
    public sharedData: ShareProvider,
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntersectionsPage');
    this.slider.lockSwipeToNext(false);
    this.sharedData.drawingToggle = true;
  }

  lockSlider(lock) {
    this.sharedData.drawingToggle = !lock;
    this.slider.lockSwipes(lock);
  }

  nextSlide() {
    console.log("in nextSlide()");
    this.slider.slideNext();
  }

  prevSlide() {
    this.slider.slidePrev();
  }

  clearCanvas() {
    let idx = this.slider.getActiveIndex();
    console.log("Active Index = " + idx);
    //this.canvasComp.redrawBgImage();
  }

  presentPopover(myEvent) { 
    let popover = this.popoverCtrl.create(GraphicToolsPage); 
    popover.present({ ev: myEvent }); 
  } 
}
