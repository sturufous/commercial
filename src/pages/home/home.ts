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
    let examTemplate = {
      licenseClass: '', 
      client: null, 
      examiner: null,
      leftTurn: {infractions: [], notes:''},
      rightTurn: {infractions: [], notes:''},
      roadPosition: {infractions: [], notes:''},
      speed: {infractions: [], notes:''},
      backing: {infractions: [], notes:''},
      shifting: {infractions: [], notes:''},
      rightOfWay: {infractions: [], notes:''},
      uncoupling: {infractions: [], notes:''},
      coupling: {infractions: [], notes:''},
      results: {dangerousAction: '', trafficViolation: '', other: '', qualified: ''}
    };

    examTemplate.licenseClass = '1';
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
    examTemplate.results = {
      dangerousAction: '',
      trafficViolation: '',
      other: '',
      qualified: 'Discontinued'
    }

    this.dbProvider.navCtrl = this.navCtrl;
    this.dbProvider.createExam(examTemplate);

    /*this.sharedData.leftTurn = examTemplate.leftTurn;
    this.sharedData.rightTurn = examTemplate.rightTurn;
    this.sharedData.roadPosition = examTemplate.roadPosition;
    this.sharedData.speed = examTemplate.speed;
    this.sharedData.backing = examTemplate.backing;
    this.sharedData.shifting = examTemplate.shifting;
    this.sharedData.rightOfWay = examTemplate.rightOfWay;
    this.sharedData.uncoupling = examTemplate.uncoupling;
    this.sharedData.coupling = examTemplate.coupling;*/

    //this.navCtrl.parent.select(1); // Jump to Details tab

  }

  deleteExam(exam) {
    this.dbProvider.deleteExam(exam);
  }

  openExam(exam) {
    let idx = exam._rev.indexOf('-');
    let revision = exam._rev.substring(0, idx);

    this.sharedData.detailsTabEnabled = true;
    this.sharedData.examinationTabEnabled = true;
    console.log("openExam: " + JSON.stringify(exam));
    this.sharedData.currentExam = exam;
    this.sharedData.examRevision = revision;

    this.sharedData.licenseClass = exam.licenseClass; 

    this.sharedData.client.setValue(exam.client);
    this.sharedData.examiner.setValue(exam.examiner);
    this.sharedData.results.setValue(exam.results);

    this.sharedData.leftTurn = exam.leftTurn;
    this.sharedData.rightTurn = exam.rightTurn;
    this.sharedData.roadPosition = exam.roadPosition;
    this.sharedData.speed = exam.speed;
    this.sharedData.backing = exam.backing;
    this.sharedData.shifting = exam.shifting;
    this.sharedData.rightOfWay = exam.rightOfWay;
    this.sharedData.uncoupling = exam.uncoupling;
    this.sharedData.coupling = exam.coupling;

    this.navCtrl.parent.select(1);
  }

  ionViewDidLoad() {
    this.dbProvider.getExams().then((data) => {
      this.exams = data;
      console.log("Data = " + JSON.stringify(data));
    })
    .catch((e) => console.log("Unable to get exams from PouchDB"));
  }
}
