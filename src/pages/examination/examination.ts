import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ShareProvider } from '../../providers/share/share';
import { Geolocation } from '@ionic-native/geolocation';
import { CommercialDbProvider } from '../../providers/commercial-db/commercial-db';

/**
 * Generated class for the ExaminationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-examination',
  templateUrl: 'examination.html',
})
export class ExaminationPage {

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
  geolocation: Geolocation;
  dbProvider: CommercialDbProvider;

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              alertCtrl: AlertController,
              shareProvider: ShareProvider,
              geolocation: Geolocation,
            ) {
    this.alertCtrl = alertCtrl;
    this.sharedData = shareProvider;
    this.geolocation = geolocation;
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
            if (data != null) {
              this.sharedData.leftTurn.push(this.getDemeritObject(data, this.sharedData.leftTurn));
              console.log("Left turn = " + JSON.stringify(this.sharedData.leftTurn));
              return true;
            }
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
          value: 'Wrong-lane#10',
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
            if (data != null) {
              this.sharedData.rightTurn.push(this.getDemeritObject(data, this.sharedData.rightTurn));
              console.log("Right turn = " + JSON.stringify(this.sharedData.rightTurn));
              return true;
            }
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
          value: 'Steering#5',
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
          value: 'Parking#5',
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
            if (data != null) {
              this.sharedData.roadPosition.push(this.getDemeritObject(data, this.sharedData.roadPosition));
              console.log("Road position = " + JSON.stringify(this.sharedData.roadPosition));
              return true;
            }
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
            if (data != null) {
              this.sharedData.speed.push(this.getDemeritObject(data, this.sharedData.speed));
              console.log("Speed = " + JSON.stringify(this.sharedData.speed));
              return true;
            }
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
            if (data != null) {
              this.sharedData.backing.push(this.getDemeritObject(data, this.sharedData.backing));
              console.log("Backing = " + JSON.stringify(this.sharedData.backing));
              return true;
            }
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
            if (data != null) {
              this.sharedData.shifting.push(this.getDemeritObject(data, this.sharedData.shifting));
              console.log("Shifting = " + JSON.stringify(this.sharedData.shifting));
              return true;
            }
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
            if (data != null) {
              this.sharedData.rightOfWay.push(this.getDemeritObject(data, this.sharedData.rightOfWay));
              console.log("Right of way = " + JSON.stringify(this.sharedData.rightOfWay));
              return true;
            }
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
            if (data != null) {
              this.sharedData.uncoupling.push(this.getDemeritObject(data, this.sharedData.uncoupling));
              console.log("Uncoupling = " + JSON.stringify(this.sharedData.uncoupling));
              return true;
            }
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
          value: 'Uncertain#5',
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
          value: 'Visual Inspection#10',
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
            if (data != null) {
              this.sharedData.coupling.push(this.getDemeritObject(data, this.sharedData.coupling));
              console.log("Coupling = " + JSON.stringify(this.sharedData.coupling));
              return true;
            }
          },
          role: 'submit'
        }
      ]});
    alert.present();
  }

  presentDemerits(demeritObject) {
    let dt = demeritObject.time.toString();
    let date: any = ''; 
    let idx = dt.indexOf('GMT');

    if (idx != -1) {
      date = dt.substring(0, idx);
    }

    let alert = this.alertCtrl.create({
      title: 'DRIVING INCIDENT',
      subTitle: demeritObject.value,
      message: '<table border="1" cellspacing="2"><tr><td colspan="2">' + date + '</td></tr>' +
        '<tr><td>Demerits</td><td>' + demeritObject.demerits + ' Points</td></tr>' +
        '<tr><td>Latitude</td><td>' + demeritObject.latitude + '</td></tr>' +
        '<tr><td>Longitude:</td><td>' + demeritObject.longitude + '</td></tr>',
      buttons: ['Dismiss']
    });
    alert.present();
  }

  getDemeritObject(data, arr) {

    if (data !== undefined) {
      let delimLoc = data.indexOf('#');
      let description = data.substring(0, delimLoc);
      let demerits = data.substring(delimLoc+1, data.length);
      let currTime = new Date();

      this.geolocation.getCurrentPosition().then((resp) => {
        this.setDemeritObjLocation(currTime, resp, arr);
        console.log("Lat: " + resp.coords.latitude);
        console.log("Lon: " + resp.coords.longitude)
      });

      return {
        value: description, 
        time: currTime, 
        demerits: demerits, 
        latitude: 0, 
        longitude: 0
      }
    } 

    return null;
  }

  setDemeritObjLocation(currTime, location, arr) {

    for (let idx = 0; idx < arr.length; idx++) {
      if (arr[idx].time == currTime) {
        arr[idx].latitude = location.coords.latitude;
        arr[idx].longitude = location.coords.longitude;
      }
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ExaminationPage');
  }

}