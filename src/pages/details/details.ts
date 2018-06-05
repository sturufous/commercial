import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShareProvider } from '../../providers/share/share';
import { ModalController, ViewController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  submitAttempt: boolean = false;

  constructor(public navCtrl: NavController, 
    shareProvider: ShareProvider, 
    modalController: ModalController,
    http: Http,
    public formBuilder: FormBuilder) {
      this.sharedData = shareProvider;
      this.modalController = modalController;
      this.http = http;

      this.client = formBuilder.group({
        dlNumber: ['', Validators.compose([Validators.maxLength(7), Validators.required])]
      })
  }
  
  save() {
    this.submitAttempt = true;

    if (!this.client.valid) {

    } else {
      console.log("success!");
      console.log(this.client.value);
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetailsPage');
  }

}
