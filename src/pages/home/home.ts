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
    let examTemplate = {client:null, examiner:null};

    examTemplate.client = {
        dlNumber: 'DL:1234567',
        surname: '', 
        givenName: ''
    };
    examTemplate.examiner = {
        apptDate: new Date(), 
        apptTime: '12:30',
        unit: '345',
        route: '4',
        telephone: '(250) 661-2008',
        initials: 'SM'
    }; 

    this.dbProvider.createExam(examTemplate);
    this.sharedData.client.setValue(examTemplate.client);
    this.sharedData.examiner.setValue(examTemplate.examiner);
    this.sharedData.detailsTabEnabled = true;
    this.sharedData.examinationTabEnabled = true;
    this.navCtrl.parent.select(1); // Jump to Details tab
  }

  deleteExam(exam) {
    this.dbProvider.deleteExam(exam);
  }

  openExam(exam) {
    this.sharedData.detailsTabEnabled = true;
    this.sharedData.examinationTabEnabled = true;
    console.log("openExam: " + JSON.stringify(exam));
    this.sharedData.currentExam = exam;

    this.sharedData.client.setValue(exam.client);
    this.sharedData.examiner.setValue(exam.examiner);
    this.navCtrl.parent.select(1);
  }

  ionViewDidLoad() {
    this.dbProvider.getExams().then((data) => {
      this.exams = data;
      console.log("Data = " + JSON.stringify(data));
    });
  }
}
