import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShareProvider } from '../../providers/share/share';
import { ModalController, ViewController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LicenseValidator } from '../../validators/licenseNumber';
import { TextMaskModule } from 'angular2-text-mask';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  sharedData: ShareProvider = null;
  modalController: ModalController = null;
  http: Http = null;
  client: FormGroup;
  examiner: FormGroup;
  submitAttempt: boolean = false;
  masks: any;
  phoneNumber: any;

  constructor(public navCtrl: NavController, 
    shareProvider: ShareProvider, 
    modalController: ModalController,
    http: Http,
    public formBuilder: FormBuilder) {
      this.sharedData = shareProvider;
      this.modalController = modalController;
      this.http = http;

      this.client = formBuilder.group({
        dlNumber: ['1234567'],
        surname: ['Morse', Validators.compose([Validators.maxLength(30), Validators.required])],
        givenName: ['Stuart', Validators.compose([Validators.maxLength(30), Validators.required])]
      })

      this.examiner = formBuilder.group({
        apptTime: ['17:22', Validators.compose([Validators.required])],
        unit: ['456', Validators.compose([Validators.maxLength(30), Validators.required])],
        route: ['4', Validators.compose([Validators.maxLength(30), Validators.required])],
        apptDate: ['2018-06-06', Validators.compose([Validators.maxLength(30), Validators.required])],
        telephone: ['(250) 658-8104', Validators.compose([Validators.maxLength(30), Validators.required])],
        initials: ['SM', Validators.compose([Validators.maxLength(30), Validators.required])]
      });

      this.masks = {
        dlNumber: ['D', 'L', ':', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
        phoneNumber: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        cardNumber: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        cardExpiry: [/[0-1]/, /\d/, '/', /[1-2]/, /\d/],
        orderCode: [/[a-zA-z]/, ':', /\d/, /\d/, /\d/, /\d/]
    };
  }
  
  save() {

    this.submitAttempt = true;
  console.log("Entering save");
    if (!this.client.valid) {
      return {
        "bad client": true
      }
    } else if (!this.examiner.valid) {
      return {
        "bad examiner": true
      }
    }
    
    console.log("success!");
    console.log(this.client.value);
    console.log(this.examiner.value);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

}
