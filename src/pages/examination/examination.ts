import { Component, ViewChildren } from '@angular/core';
import { IonicPage, NavController, NavParams, Platform } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { ShareProvider } from '../../providers/share/share';
import { Geolocation } from '@ionic-native/geolocation';
import { CommercialDbProvider } from '../../providers/commercial-db/commercial-db';
import { ActionSheetController } from 'ionic-angular';
import { CanvasDrawComponent } from '../../components/canvas-draw/canvas-draw';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, CameraPosition, MarkerOptions, LatLng, Marker, Polyline, PolylineOptions } from '@ionic-native/google-maps';

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

  @ViewChildren(CanvasDrawComponent) canvases;

  coords = [{"lat":48.4237177,"lng":-123.3680865},{"lat":48.4242613,"lng":-123.3680264},{"lat":48.4236136,"lng":-123.3680262},{"lat":48.4229232,"lng":-123.3687865},{"lat":48.423518,"lng":-123.3680469},{"lat":48.4235309,"lng":-123.3680584},{"lat":48.4234996,"lng":-123.367864},{"lat":48.4234134,"lng":-123.3679486},{"lat":48.4234784,"lng":-123.367642},{"lat":48.4234734,"lng":-123.3676063},{"lat":48.4234678,"lng":-123.3675603},{"lat":48.4234714,"lng":-123.3674573},{"lat":48.4234551,"lng":-123.3675247},{"lat":48.4234602,"lng":-123.3675046},{"lat":48.4233403,"lng":-123.3674852},{"lat":48.4232749,"lng":-123.3674793},{"lat":48.4232726,"lng":-123.3674764},{"lat":48.4232703,"lng":-123.3674801},{"lat":48.423278,"lng":-123.3674764},{"lat":48.4232629,"lng":-123.3674765},{"lat":48.4232444,"lng":-123.3674457},{"lat":48.4232409,"lng":-123.3674616},{"lat":48.4232455,"lng":-123.367465},{"lat":48.4232426,"lng":-123.3674608},{"lat":48.4232396,"lng":-123.3674682},{"lat":48.4232384,"lng":-123.36747},{"lat":48.4232912,"lng":-123.36746},{"lat":48.4232546,"lng":-123.3674692},{"lat":48.423248,"lng":-123.367465},{"lat":48.4232387,"lng":-123.3674711},{"lat":48.4232343,"lng":-123.3674724},{"lat":48.4232454,"lng":-123.3674684},{"lat":48.4232454,"lng":-123.3674707},{"lat":48.4232539,"lng":-123.3674839},{"lat":48.4232315,"lng":-123.3674774},{"lat":48.4232343,"lng":-123.3674719},{"lat":48.4232345,"lng":-123.3674774},{"lat":48.4232622,"lng":-123.3674721},{"lat":48.4232354,"lng":-123.3674748},{"lat":48.4232608,"lng":-123.3674832},{"lat":48.4232758,"lng":-123.3674689},{"lat":48.4232547,"lng":-123.3674738},{"lat":48.4232405,"lng":-123.3674755},{"lat":48.423237,"lng":-123.3674754},{"lat":48.4232334,"lng":-123.3674779},{"lat":48.423234,"lng":-123.3674768},{"lat":48.4232382,"lng":-123.3674805},{"lat":48.4232364,"lng":-123.36748},{"lat":48.4232507,"lng":-123.3674797},{"lat":48.4232434,"lng":-123.3674785},{"lat":48.4232499,"lng":-123.367476},{"lat":48.4232452,"lng":-123.3674759},{"lat":48.4232382,"lng":-123.367468},{"lat":48.4232264,"lng":-123.3674789},{"lat":48.4232444,"lng":-123.3674697},{"lat":48.4232582,"lng":-123.367479},{"lat":48.4232532,"lng":-123.3674848},{"lat":48.4232241,"lng":-123.3674895},{"lat":48.4232519,"lng":-123.3674824},{"lat":48.42331,"lng":-123.3674698}];
  subscription;
  position: any = {
    latitude: '...',
    longitude: '...',
    accuracy: '...',
    altitude: '...',
    altitudeAccuracy: '...',
    speed: '...',
    heading: '...'
  }

  myClass: any = 'bad';
  showLocation: boolean = false;
  commentArray: any = [];
  typedComments = false;

  alertCtrl: AlertController;
  sharedData: ShareProvider;
  geolocation: Geolocation;
  dbProvider: CommercialDbProvider;
  map: GoogleMap;
  line: Polyline = null;

  gpsData: any = [];
  gpsView: any = 'Blank';

  constructor(public navCtrl: NavController, 
              public navParams: NavParams, 
              public actionSheet: ActionSheetController,
              alertCtrl: AlertController,
              shareProvider: ShareProvider,
              geolocation: Geolocation,
              dbProvider: CommercialDbProvider,
              public platform: Platform
            ) {
    this.alertCtrl = alertCtrl;
    this.sharedData = shareProvider;
    this.geolocation = geolocation;
    this.dbProvider = dbProvider;
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
          name: 'steering',
          type: 'radio',
          label: 'Steering',
          value: 'Steering#5',
          checked: false
        },
        {
          name: 'improper-turn',
          type: 'radio',
          label: 'Improper Turn - cut/wide/setup',
          value: 'Improper Turn#10',
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
              this.sharedData.leftTurn.infractions.push(this.getDemeritObject(data, this.sharedData.leftTurn));
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
          name: 'steering',
          type: 'radio',
          label: 'Steering',
          value: 'Steering#5',
          checked: false
        },
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
              this.sharedData.rightTurn.infractions.push(this.getDemeritObject(data, this.sharedData.rightTurn));
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
              this.sharedData.roadPosition.infractions.push(this.getDemeritObject(data, this.sharedData.roadPosition));
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
              this.sharedData.speed.infractions.push(this.getDemeritObject(data, this.sharedData.speed));
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
              this.sharedData.backing.infractions.push(this.getDemeritObject(data, this.sharedData.backing));
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
              this.sharedData.shifting.infractions.push(this.getDemeritObject(data, this.sharedData.shifting));
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
              this.sharedData.rightOfWay.infractions.push(this.getDemeritObject(data, this.sharedData.rightOfWay));
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
              this.sharedData.uncoupling.infractions.push(this.getDemeritObject(data, this.sharedData.uncoupling));
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
              this.sharedData.coupling.infractions.push(this.getDemeritObject(data, this.sharedData.coupling));
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
    let time: any = '';
    let idx = dt.indexOf('GMT');

    if (idx != -1) {
      date = dt.substring(0, idx - 9);
      time = dt.substring(idx-9, idx)
    } else {
      date = "undefined";
    }

    let alert = this.alertCtrl.create({
      title: 'DRIVING INCIDENT',
      subTitle: demeritObject.value,
      message: '<table><tr><td>Date:&nbsp;</td><td>' + date + '</td></tr>' +
        '<tr><td>Time:&nbsp;</td><td>' + time + '</td></tr>' +
        '<tr><td>Demerits:&nbsp;</td><td>' + demeritObject.demerits + ' Points</td></tr>' +
        '<tr><td>Latitude:&nbsp;</td><td>' + demeritObject.latitude + '</td></tr>' +
        '<tr><td>Longitude:&nbsp;</td><td>' + demeritObject.longitude + '</td></tr>' +
        '<tr><td>Altitude:&nbsp;</td><td>' + demeritObject.altitude + '</td></tr>' +
        '<tr><td>Speed:&nbsp;</td><td>' + demeritObject.speed + '</td></tr>',
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
      })
      .catch (e => this.sharedData.presentBasicAlert("Error", e));

      // Return demerit object, geolocation will catch up later
      return {
        value: description, 
        time: currTime, 
        demerits: demerits, 
        latitude: 0, 
        longitude: 0,
        altitude: 0,
        speed: 0
      }
    } 

    return null;
  }

  setDemeritObjLocation(currTime, location, arr) {

    console.log("Infraction array = " + arr)
    for (let idx = 0; idx < arr.infractions.length; idx++) {
      if (arr.infractions[idx].time == currTime) {
        arr.infractions[idx].latitude = location.coords.latitude;
        arr.infractions[idx].longitude = location.coords.longitude;
        arr.infractions[idx].altitude = location.coords.altitude;
        arr.infractions[idx].speed = location.coords.speed;
      }
    }
  }

  saveCurrentExam() {
    if (this.sharedData.prepareCurrentExam().valid) {
      this.dbProvider.updateExam();
    }
  }

  // TODO: Clean up comment array use, should there be a copy here and in sharedData?
  // Also, does the array have to be instantiated each time we run this?
  showAttachmentIcon(index) {
    if (typeof this.commentArray[index] != 'undefined') {
      return this.commentArray[index].wasLoaded;
    };

    return true;
  }

  loadMap() {
    let options: PolylineOptions = {
      points: [{
        lat: 48.4238642,
        lng: -123.36846639
      }],
      color: '#AA00FF',
      width: 10,
      geodesic: true
    };

    const VICTORIA_BC = {"lat": 48.4238642, "lng": -123.36846639};
 
        this.map = new GoogleMap('map_canvas', {
          'controls': {
            'compass': true,
            'myLocationButton': true,
            'indoorPicker': true,
          },
          'gestures': {
            'scroll': true,
            'tilt': true,
            'rotate': true,
            'zoom': true
          },
          'camera': {
            target: VICTORIA_BC,
            zoom: 18,
            tilt: 30
          }
        });
 
        this.map = GoogleMaps.create('map_canvas');

        console.log('Map is ready!');
        let marker: Marker = this.map.addMarkerSync({
          title: 'ICBC Home Base',
          icon: 'blue',
          animation: 'DROP',
          position: {
            lat: 48.4238642,
            lng: -123.36846639
          }
        });
        //marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        //  alert('clicked');
        //});

        if (this.line === null) {
          this.map.addPolyline(options).then((result) => {
            console.log("Added polyline" + JSON.stringify(result));
            this.line = result;
          });
        }

    // Wait the maps plugin is ready until the MAP_READY event
    //this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
    //  console.log('map is ready to use.');
    //});
  }

  ionViewDidLoad() {

    this.sharedData.examinationCanvases = this.canvases;
    this.commentArray = this.sharedData.examinationCanvases.toArray();
    this.loadMap();

    // Initialize all canvas elements to blank backgrounds    
    for (let canvasIdx=0; canvasIdx < this.commentArray.length; canvasIdx++) {
      this.commentArray[canvasIdx].drawBackground();
    }

    this.sharedData.examinationPage = this;
    this.sharedData.readExamAttachments(this.dbProvider);
    this.subscription = this.geolocation.watchPosition()
      .subscribe(position => {
        console.log(position.coords.longitude + ' ' + position.coords.latitude);
        this.position.latitude = position.coords.latitude != null ? position.coords.latitude : '...';
        this.position.longitude = position.coords.longitude != null ? position.coords.longitude : '...';
        this.position.accuracy = position.coords.accuracy != null ? position.coords.accuracy : '...';
        this.position.altitude = position.coords.altitude != null ? position.coords.altitude : '...';
        this.position.altitudeAccuracy = position.coords.altitudeAccuracy != null ? position.coords.altitudeAccuracy : '...';
        this.position.speed = position.coords.speed != null ? position.coords.speed : '...';
        this.position.heading = position.coords.heading != null ? position.coords.heading : '...';

        this.position.latitude = this.position.latitude.toString().substr(0, 9);
        this.position.longitude = this.position.longitude.toString().substr(0, 9);
        this.position.altitude = this.position.altitude.toString().substr(0, 9);

        this.gpsData.push({ lat: position.coords.latitude, lng: position.coords.longitude});

        if (this.line !== null) {
          this.line.setPoints(this.gpsData);
        }
        this.gpsView = JSON.stringify(this.gpsData);
      });
    //this.commentArray = this.canvases.toArray();
    console.log('ionViewDidLoad ExaminationPage');
  }

  clearComment(index) {
    this.commentArray[index].drawBackground(null);
    this.commentArray[index].dirty = true;
  }

  toggleComments() {
    this.typedComments = !this.typedComments;
    return this.typedComments;
  }

  reloadComment(index) {
    this.sharedData.readSingleCommentAttachment(this.dbProvider, index);
  }

  deleteComment(index) {
    this.sharedData.deleteSingleCommentAttachment(this.dbProvider, index);
    this.commentArray[index].drawBackground(null);
  }

  showGpsStream() {
    JSON.stringify(this.gpsData);
  }

  showGpsData() {
    console.log("In showGpsData()")
    const gpsView = this.actionSheet.create({
      title: 'Location Snapshot',
      cssClass: 'action-sheet-title',
      buttons: [
        {
          text: 'Latitude: ' + this.position.latitude,
          icon: 'md-arrow-dropdown-circle',
          cssClass: 'sheet',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'Longitude: ' + this.position.longitude,
          icon: 'md-arrow-dropleft-circle',
          cssClass: 'sheet',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'Accuracy: ' + this.position.accuracy + ' Metres',
          icon: 'md-analytics',
          cssClass: 'sheet',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'Altitude: ' + this.position.altitude,
          icon: 'md-image',
          cssClass: 'sheet',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'Altitude Accuracy: ' + this.position.altitudeAccuracy,
          icon: 'ios-analytics',
          cssClass: 'sheet',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'Speed: ' + this.position.speed,
          icon: 'ios-speedometer',
          cssClass: 'sheet',
          handler: () => {
            console.log('Destructive clicked');
          }
        },{
          text: 'Heading: ' + this.position.heading,
          icon: 'md-compass',
          cssClass: 'sheet-last',
          handler: () => {
            console.log('Destructive clicked');
          }
        }
      ]
    });
    gpsView.present();
  }
}