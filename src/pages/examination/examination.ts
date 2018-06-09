import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ShareProvider } from '../../providers/share/share';

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

  sharedData: ShareProvider;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              alertCtrl: AlertController,
              shareProvider: ShareProvider, 
            ) {
    this.alertCtrl = alertCtrl;
    this.sharedData = shareProvider;
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

  getDemeritCount(infractionType) {

    let count: number = 0;

    for (let idx=0; idx < infractionType.length; idx++) {
      count += eval(infractionType[idx].demerits);
    }

    return count;
  }

  getTotalDemeritCount() {

    let count: number = 0;

    count = this.getDemeritCount(this.leftTurn) +
            this.getDemeritCount(this.rightTurn) +
            this.getDemeritCount(this.roadPosition) +
            this.getDemeritCount(this.speed) +
            this.getDemeritCount(this.backing) +
            this.getDemeritCount(this.shifting) +
            this.getDemeritCount(this.rightOfWay) +
            this.getDemeritCount(this.uncoupling) +
            this.getDemeritCount(this.coupling);
  
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
          value: 'Improper Turn#5',
          checked: false
        },
        {
          name: 'wrong-lane',
          type: 'radio',
          label: 'Ends in wrong lane',
          value: 'Wrong Lane#10',
          checked: false
        },
        {
          name: 'observation',
          type: 'radio',
          label: 'Observation before/during turn',
          value: 'Observation#10',
          checked: false
        },
        {
          name: 'signal',
          type: 'radio',
          label: 'Signal - timing/no/cancel',
          value: 'Signal#10',
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
          value: 'Improper Turn#5',
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
          value: 'Observation#10',
          checked: false
        },
        {
          name: 'signal',
          type: 'radio',
          label: 'Signal - timing/no/cancel',
          value: 'Signal#10',
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
          value: 'Too Far Over#5',
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
          value: 'Lane Selection#5',
          checked: false
        },
        {
          name: 'too-far-ahead-back',
          type: 'radio',
          label: 'Stops too far ahead/back',
          value: 'Too Far Ahead/Back#5',
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
          value: 'Conditions/Mirror#10',
          checked: false
        },
        {
          name: 'too-close',
          type: 'radio',
          label: 'Follows too close',
          value: 'Too Close#10',
          checked: false
        },
        {
          name: 'lane-change',
          type: 'radio',
          label: 'Lane Change',
          value: 'Lane Change#10',
          checked: false
        },
        {
          name: 'off-track',
          type: 'radio',
          label: 'Off track/straddles',
          value: 'Off Track#10',
          checked: false
        },
        {
          name: 'signal',
          type: 'radio',
          label: 'Signal - timing/no/cancel',
          value: 'Signal#10',
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
          value: 'Too Slow#5',
          checked: false
        },
        {
          name: 'uneven-speed',
          type: 'radio',
          label: 'Uneven speed control',
          value: 'Uneven Speed#5',
          checked: false
        },
        {
          name: 'approach-too-fast',
          type: 'radio',
          label: 'Approach too fast',
          value: 'Approach Too Fast#5',
          checked: false
        },
        {
          name: 'improper-braking',
          type: 'radio',
          label: 'Improper use of brake/service/retarder',
          value: 'Improper Braking#5',
          checked: false
        },
        {
          name: 'too-fast',
          type: 'radio',
          label: 'Too fast for conditions',
          value: 'Too Fast#10',
          checked: false
        },
        {
          name: 'rolling-stop',
          type: 'radio',
          label: 'Rolling stop',
          value: 'Rolling Stop#10',
          checked: false
        },
        {
          name: 'amber-light',
          type: 'radio',
          label: 'Amber light',
          value: 'Amber Light#10',
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
          value: 'No Horn#5',
          checked: false
        },
        {
          name: 'steering',
          type: 'radio',
          label: 'Steering',
          value: 'Steering#5',
          checked: false
        },
        {
          name: 'walk-around',
          type: 'radio',
          label: 'Fails to walk around before backing/360 degree',
          value: 'No Walk Around#5',
          checked: false
        },
        {
          name: 'poor-observation',
          type: 'radio',
          label: 'Poor observation while backing',
          value: 'Poor Observation#10',
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
          value: 'Wrong Gear#5',
          checked: false
        },
        {
          name: 'misses-shift',
          type: 'radio',
          label: 'Misses shift',
          value: 'Misses Shift#5',
          checked: false
        },
        {
          name: 'clutch-throttle',
          type: 'radio',
          label: 'Improper use of clutch/throttle',
          value: 'Clutch/Throttle#5',
          checked: false
        },
        {
          name: 'difficulty-recovering',
          type: 'radio',
          label: 'Difficulty recovering shift or coasts',
          value: 'Difficulty Recovering#10',
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
          value: 'Uncertain#5',
          checked: false
        },
        {
          name: 'assumes',
          type: 'radio',
          label: 'Assumes',
          value: 'Assumes#10',
          checked: false
        },
        {
          name: 'unnecessary-stop',
          type: 'radio',
          label: 'Stops unnecessarily',
          value: 'Unnecessary Stop#10',
          checked: false
        },
        {
          name: 'fail-to-yield',
          type: 'radio',
          label: 'Fails to yield to vehicle/pedestrian',
          value: 'Fails To Yield#10',
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
          value: 'Uncertain#5',
          checked: false
        },
        {
          name: 'no-brakes-trailer',
          type: 'radio',
          label: 'Brakes not applied/trailer not secured',
          value: 'No Brakes/Trailer Insecure#5',
          checked: false
        },
        {
          name: 'too-far-ahead',
          type: 'radio',
          label: 'Moves tractor too far ahead/clearance',
          value: 'Too Far Ahead#10',
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
          value: 'Alignment#5',
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
          value: 'Proper Heightt#10',
          checked: false
        },
        {
          name: 'tug-test',
          type: 'radio',
          label: 'Tug test not complete',
          value: 'Tug Test#10',
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