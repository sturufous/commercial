import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/**
 * Generated class for the ExaminationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-examination',
  templateUrl: 'examination.html',
})
export class ExaminationPage {

  leftTurn: any = [];
  rightTurn: any = [];
  roadPosition: any = [];
  speed: any = [];
  backing: any = [];
  shifting: any = [];
  rightOfWay: any = [];
  uncoupling: any = [];
  coupling: any = [];

  myClass: any = 'bad';

  alertCtrl: AlertController;

  constructor(public navCtrl: NavController, public navParams: NavParams, alertCtrl: AlertController) {
    this.alertCtrl = alertCtrl;
  }

  presentLeftTurn() {
    let alert = this.alertCtrl.create({
      title: 'LEFT TURN',
      inputs: [
        {
          name: 'improper-turn',
          type: 'radio',
          label: 'Improper Turn - cut/wide/setup',
          value: 'improper-turn',
          checked: false
        },
        {
          name: 'wrong-lane',
          type: 'radio',
          label: 'Ends in wrong lane',
          value: 'wrong-lane',
          checked: false
        },
        {
          name: 'observation',
          type: 'radio',
          label: 'Observation before/during turn',
          value: 'observation',
          checked: false
        },
        {
          name: 'signal',
          type: 'radio',
          label: 'Signal - timing/no/cancel',
          value: 'signal',
          checked: false
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Ok',
          handler: data => {
            this.leftTurn.push({value: data, time: new Date()});
            console.log("Left turn = " + JSON.stringify(this.leftTurn));
            return true;
          },
          role: 'submit'
        }
      ]});
    alert.present();
  }

  badgeColor(length) {
    if (length == 0) {
      return 'good';
    } else {
      return 'bad';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExaminationPage');
  }

}