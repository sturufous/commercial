import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CanvasDrawComponent } from '../../components/canvas-draw/canvas-draw';

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

  canvasComp: CanvasDrawComponent;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams
    ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IntersectionsPage');
  }

}
