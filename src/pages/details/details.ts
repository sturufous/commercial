import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShareProvider } from '../../providers/share/share';
import { ModalController, ViewController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LicenseValidator } from '../../validators/licenseNumber';
import { TextMaskModule } from 'angular2-text-mask';
import { ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';
import { CommercialDbProvider } from '../../providers/commercial-db/commercial-db';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  @ViewChild('testSlider') slider;
  dbProvider: CommercialDbProvider;
  sharedData: ShareProvider = null;
  modalController: ModalController = null;
  http: Http = null;
  client: FormGroup;
  examiner: FormGroup;
  submitAttempt: boolean = false;
  masks: any;
  phoneNumber: any;
  classes: any = ['1','3','2','4U','4-17']

  constructor(public navCtrl: NavController, 
    shareProvider: ShareProvider, 
    modalController: ModalController,
    dbProvider: CommercialDbProvider,
    http: Http,
    navparams: NavParams,
    public formBuilder: FormBuilder) {
      this.sharedData = shareProvider;
      this.modalController = modalController;
      this.http = http;
      this.dbProvider = dbProvider;

      console.log("Navparams = " + JSON.stringify(navparams));

      this.sharedData.currentExam._id = navparams.data._id;
      this.sharedData.currentExam._rev = navparams.data._rev;

      this.sharedData.client = formBuilder.group({
        dlNumber: ['DL:1234567'],
        surname: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
        givenName: ['', Validators.compose([Validators.maxLength(30), Validators.required])]
      })
      this.sharedData.client.setValue(navparams.data.client);

      this.sharedData.examiner = formBuilder.group({
        apptTime: ['17:22', Validators.compose([Validators.required])],
        unit: ['456', Validators.compose([Validators.maxLength(10), Validators.required])],
        route: ['4', Validators.compose([Validators.maxLength(10), Validators.required])],
        apptDate: ['2018-06-06', Validators.compose([Validators.required])],
        telephone: ['(250) 658-8104', Validators.compose([Validators.required])],
        initials: ['SM', Validators.compose([Validators.maxLength(3), Validators.required])]
      });
      this.sharedData.examiner.setValue(navparams.data.examiner);

      this.masks = {
        dlNumber: ['D', 'L', ':', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
        phoneNumber: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        cardNumber: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        cardExpiry: [/[0-1]/, /\d/, '/', /[1-2]/, /\d/],
        orderCode: [/[a-zA-z]/, ':', /\d/, /\d/, /\d/, /\d/]
    };

    this.sharedData.licenseClass = '1';
  }
  
  save() {

    this.submitAttempt = true;
    console.log("Entering save");
    if (!this.sharedData.client.valid) {
      return {
        "bad client": true
      }
    } else if (!this.sharedData.examiner.valid) {
      return {
        "bad examiner": true
      }
    }
    
    this.sharedData.currentExam.client = this.sharedData.client.value;
    this.sharedData.currentExam.examiner = this.sharedData.examiner.value;
    console.log(JSON.stringify(this.sharedData.currentExam));
    this.dbProvider.updateExam(this.sharedData.currentExam);
  }

  slideChanged() {
    this.sharedData.licenseClass = this.classes[this.slider.getActiveIndex()];
    console.log("License class = " + this.sharedData.licenseClass);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

}
