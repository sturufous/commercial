import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ShareProvider } from '../../providers/share/share';
import { ModalController, ViewController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  sharedData: ShareProvider = null;
  modalController: ModalController = null;
  http: Http = null;

  constructor(public navCtrl: NavController, 
    shareProvider: ShareProvider, 
    modalController: ModalController,
    http: Http) {
 
      this.sharedData = shareProvider;
      this.modalController = modalController;
      this.http = http;

  }

}
