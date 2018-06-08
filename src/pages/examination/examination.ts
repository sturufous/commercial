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

  hideDemerits: any = {
    leftTurn: true,
    rightTurn: true,
    roadPosition: true,
    speed: true,
    backing: true,
    shifting: true,
    rightOfWay: true,
    uncoupling: true,
    coupling: true
  }

  myClass: any = 'bad';

  alertCtrl: AlertController;

  constructor(public navCtrl: NavController, public navParams: NavParams, alertCtrl: AlertController) {
    this.alertCtrl = alertCtrl;
  }

  deleteInfraction(infraction, infractions) {
    var index = this.indexByTime(infraction, infractions);
    if (index > -1) {
        infractions.splice(index, 1);
    }
  }

  indexByTime(childArray, parentArray) {
    let index: any = -1;
    for (let idx = 0; idx < parentArray.length; idx++) {
      if (parentArray[idx].time == childArray.time) {
        index = idx;
        break;
      }
    }
    return index;
  }

  getDemerits(infractionType) {

    let count: number = 0;

    for (let idx=0; idx < infractionType.length; idx++) {
      count += eval(infractionType[idx].demerits);
    }

    return count;
  }

  presentLeftTurn() {
    let alert = this.alertCtrl.create({
      title: 'LEFT TURN',
      inputs: [
        {
          name: 'improper-turn',
          type: 'radio',
          label: 'Improper Turn - cut/wide/setup',
          value: 'improper-turn#5',
          checked: false
        },
        {
          name: 'wrong-lane',
          type: 'radio',
          label: 'Ends in wrong lane',
          value: 'wrong-lane#10',
          checked: false
        },
        {
          name: 'observation',
          type: 'radio',
          label: 'Observation before/during turn',
          value: 'observation#10',
          checked: false
        },
        {
          name: 'signal',
          type: 'radio',
          label: 'Signal - timing/no/cancel',
          value: 'signal#10',
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
            this.leftTurn.push(this.getDemeritObject(data));
            console.log("Left turn = " + JSON.stringify(this.leftTurn));
            return true;
          },
          role: 'submit'
        }
      ]});
    alert.present();
  }

  presentRightTurn() {
    let alert = this.alertCtrl.create({
      title: 'RIGHT TURN',
      inputs: [
        {
          name: 'improper-turn',
          type: 'radio',
          label: 'Improper Turn - cut/wide/setup',
          value: 'improper-turn#5',
          checked: false
        },
        {
          name: 'wrong-lane',
          type: 'radio',
          label: 'Ends in wrong lane',
          value: 'wrong-lane#10',
          checked: false
        },
        {
          name: 'observation',
          type: 'radio',
          label: 'Observation before/during turn',
          value: 'observation#10',
          checked: false
        },
        {
          name: 'signal',
          type: 'radio',
          label: 'Signal - timing/no/cancel',
          value: 'signal#10',
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
            this.rightTurn.push(this.getDemeritObject(data));
            console.log("Right turn = " + JSON.stringify(this.rightTurn));
            return true;
          },
          role: 'submit'
        }
      ]});
    alert.present();
  }

  presentRoadPosition() {
    let alert = this.alertCtrl.create({
      title: 'ROAD POSITION',
      inputs: [
        {
          name: 'too-far-over',
          type: 'radio',
          label: 'Too far left/right',
          value: 'too-far-over#5',
          checked: false
        },
        {
          name: 'steering',
          type: 'radio',
          label: 'Steering',
          value: 'steering#5',
          checked: false
        },
        {
          name: 'lane-selection',
          type: 'radio',
          label: 'Lane Selection',
          value: 'lane-selection#5',
          checked: false
        },
        {
          name: 'too-far-ahead-back',
          type: 'radio',
          label: 'Stops too far ahead/back',
          value: 'too-far-ahead-back#5',
          checked: false
        },
        {
          name: 'parking',
          type: 'radio',
          label: 'Parking',
          value: 'parking#5',
          checked: false
        },
        {
          name: 'conditions-mirrors',
          type: 'radio',
          label: 'Fails to observe conditions/mirrors',
          value: 'conditions-mirrors#10',
          checked: false
        },
        {
          name: 'too-close',
          type: 'radio',
          label: 'Follows too close',
          value: 'too-close#10',
          checked: false
        },
        {
          name: 'lane-change',
          type: 'radio',
          label: 'Lane Change',
          value: 'lane-change#10',
          checked: false
        },
        {
          name: 'off-track',
          type: 'radio',
          label: 'Off track/straddles',
          value: 'off-track#10',
          checked: false
        },
        {
          name: 'signal',
          type: 'radio',
          label: 'Signal - timing/no/cancel',
          value: 'signal#10',
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
            this.roadPosition.push(this.getDemeritObject(data));
            console.log("Road position = " + JSON.stringify(this.roadPosition));
            return true;
          },
          role: 'submit'
        }
      ]});
    alert.present();
  }

  presentSpeed() {
    let alert = this.alertCtrl.create({
      title: 'SPEED',
      inputs: [
        {
          name: 'too-slow',
          type: 'radio',
          label: 'Too slow for conditions',
          value: 'too-slow#5',
          checked: false
        },
        {
          name: 'uneven-speed',
          type: 'radio',
          label: 'Uneven speed control',
          value: 'uneven-speed#5',
          checked: false
        },
        {
          name: 'approach-too-fast',
          type: 'radio',
          label: 'Approach too fast',
          value: 'approach-too-fast#5',
          checked: false
        },
        {
          name: 'improper-braking',
          type: 'radio',
          label: 'Improper use of brake/service/retarder',
          value: 'improper-braking#5',
          checked: false
        },
        {
          name: 'too-fast',
          type: 'radio',
          label: 'Too fast for conditions',
          value: 'too-fast#10',
          checked: false
        },
        {
          name: 'rolling-stop',
          type: 'radio',
          label: 'Rolling stop',
          value: 'rolling-stop#10',
          checked: false
        },
        {
          name: 'amber-light',
          type: 'radio',
          label: 'Amber light',
          value: 'amber-light#10',
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
            this.speed.push(this.getDemeritObject(data));
            console.log("Speed = " + JSON.stringify(this.speed));
            return true;
          },
          role: 'submit'
        }
      ]});
    alert.present();
  }

  presentBacking() {
    let alert = this.alertCtrl.create({
      title: 'BACKING',
      inputs: [
        {
          name: 'no-horn',
          type: 'radio',
          label: 'Fails to sound horn',
          value: 'no-horn#5',
          checked: false
        },
        {
          name: 'steering',
          type: 'radio',
          label: 'Steering',
          value: 'steering#5',
          checked: false
        },
        {
          name: 'walk-around',
          type: 'radio',
          label: 'Fails to walk around before backing/360 degree',
          value: 'approach-too-fast#5',
          checked: false
        },
        {
          name: 'poor-observation',
          type: 'radio',
          label: 'Poor observation while backing',
          value: 'poor-observation#10',
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
            this.backing.push(this.getDemeritObject(data));
            console.log("Backing = " + JSON.stringify(this.backing));
            return true;
          },
          role: 'submit'
        }
      ]});
    alert.present();
  }

  presentShifting() {
    let alert = this.alertCtrl.create({
      title: 'SHIFTING',
      inputs: [
        {
          name: 'wrong-gear',
          type: 'radio',
          label: 'Wrong gear',
          value: 'wrong-gear#5',
          checked: false
        },
        {
          name: 'misses-shift',
          type: 'radio',
          label: 'Misses shift',
          value: 'misses-shift#5',
          checked: false
        },
        {
          name: 'clutch-throttle',
          type: 'radio',
          label: 'Improper use of clutch/throttle',
          value: 'clutch-throttle#5',
          checked: false
        },
        {
          name: 'difficulty-recovering',
          type: 'radio',
          label: 'Difficulty recovering shift or coasts',
          value: 'difficulty-recovering#10',
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
            this.shifting.push(this.getDemeritObject(data));
            console.log("Shifting = " + JSON.stringify(this.shifting));
            return true;
          },
          role: 'submit'
        }
      ]});
    alert.present();
  }

  presentRightOfWay() {
    let alert = this.alertCtrl.create({
      title: 'RIGHT OF WAY',
      inputs: [
        {
          name: 'uncertain',
          type: 'radio',
          label: 'Uncertain - take/yeald',
          value: 'uncertain#5',
          checked: false
        },
        {
          name: 'assumes',
          type: 'radio',
          label: 'Assumes',
          value: 'assumes#10',
          checked: false
        },
        {
          name: 'unnecessary-stop',
          type: 'radio',
          label: 'Stops unnecessarily',
          value: 'unnecessary-stop#10',
          checked: false
        },
        {
          name: 'fail-to-yield',
          type: 'radio',
          label: 'Fails to yield to vehicle/pedestrian',
          value: 'fail-to-yield#10',
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
            this.rightOfWay.push(this.getDemeritObject(data));
            console.log("Right of way = " + JSON.stringify(this.rightOfWay));
            return true;
          },
          role: 'submit'
        }
      ]});
    alert.present();
  }

  presentUncoupling() {
    let alert = this.alertCtrl.create({
      title: 'UNCOUPLING',
      inputs: [
        {
          name: 'uncertain',
          type: 'radio',
          label: 'Uncertain procedure',
          value: 'uncertain#5',
          checked: false
        },
        {
          name: 'no-brakes-trailer',
          type: 'radio',
          label: 'Brakes not applied/trailer not secured',
          value: 'no-brakes-trailer#5',
          checked: false
        },
        {
          name: 'too-far-ahead',
          type: 'radio',
          label: 'Moves tractor too far ahead/clearance',
          value: 'too-far-ahead#10',
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
            this.uncoupling.push(this.getDemeritObject(data));
            console.log("Uncoupling = " + JSON.stringify(this.uncoupling));
            return true;
          },
          role: 'submit'
        }
      ]});
    alert.present();
  }

  presentCoupling() {
    let alert = this.alertCtrl.create({
      title: 'COUPLING',
      inputs: [
        {
          name: 'uncertain',
          type: 'radio',
          label: 'Uncertain procedure',
          value: 'uncertain#5',
          checked: false
        },
        {
          name: 'alignment',
          type: 'radio',
          label: 'Align tractor and trailer',
          value: 'alignment#5',
          checked: false
        },
        {
          name: 'visual-inspection',
          type: 'radio',
          label: 'Visual inspection of jaws/hitch',
          value: 'visual-inspection#10',
          checked: false
        },
        {
          name: 'proper-height',
          type: 'radio',
          label: 'Proper height/alignment/landing gear',
          value: 'proper-height#10',
          checked: false
        },
        {
          name: 'tug-test',
          type: 'radio',
          label: 'Tug test not complete',
          value: 'tug-test#10',
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
            this.coupling.push(this.getDemeritObject(data));
            console.log("Coupling = " + JSON.stringify(this.coupling));
            return true;
          },
          role: 'submit'
        }
      ]});
    alert.present();
  }

  getDemeritObject(data) {

    let delimLoc = data.indexOf('#');
    let description = data.substring(0, delimLoc);
    let demerits = data.substring(delimLoc+1, data.length);

    return {value: description, time: new Date(), demerits: demerits}
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