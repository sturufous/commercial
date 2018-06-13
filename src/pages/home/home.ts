import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ShareProvider } from '../../providers/share/share';
import { ModalController, ViewController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CommercialDbProvider } from '../../providers/commercial-db/commercial-db';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  sharedData: ShareProvider = null;
  modalController: ModalController = null;
  http: Http = null;
  dbProvider: CommercialDbProvider;
  candidates: any;

  constructor(public navCtrl: NavController, 
    shareProvider: ShareProvider, 
    modalController: ModalController,
    dbProvider: CommercialDbProvider,
    http: Http) {
 
      this.sharedData = shareProvider;
      this.modalController = modalController;
      this.dbProvider = dbProvider;
      this.http = http;
  }

  ionViewDidLoad() {
    this.dbProvider.getCandidates().then((data) => {
      this.candidates = data;
      console.log("Data = " + JSON.stringify(data));
    });
  }
}
