import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ShareProvider } from '../../providers/share/share';
import { ModalController, ViewController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { CommercialDbProvider } from '../../providers/commercial-db/commercial-db';
import { DetailsPage } from '../../pages/details/details';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  sharedData: ShareProvider = null;
  modalController: ModalController = null;
  http: Http = null;
  dbProvider: CommercialDbProvider;
  exams: any;

  constructor(
    public navCtrl: NavController, 
    shareProvider: ShareProvider, 
    modalController: ModalController,
    dbProvider: CommercialDbProvider,
    http: Http) {
 
      this.sharedData = shareProvider;
      this.modalController = modalController;
      this.dbProvider = dbProvider;
      this.http = http;
  }

  newExam() {
    this.sharedData.initializeExam();
    this.dbProvider.createExam(this.sharedData.currentExam);
    this.navCtrl.push(DetailsPage);
  }

  deleteExam(exam) {
    this.dbProvider.deleteExam(exam);
  }

  openExam(exam) {
    this.navCtrl.setRoot(DetailsPage, exam);
  }

  ionViewDidLoad() {
    this.dbProvider.getExams().then((data) => {
      this.exams = data;
      console.log("Data = " + JSON.stringify(data));
    });
  }
}
