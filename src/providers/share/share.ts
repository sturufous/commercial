import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';

/*
  Generated class for the ShareProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
 
@Injectable()
export class ShareProvider {

    leftTurn: any = {infractions: [], notes:''};
    rightTurn: any = {infractions: [], notes:''};
    roadPosition: any = {infractions: [], notes:''};
    speed: any = {infractions: [], notes:''};
    backing: any = {infractions: [], notes:''};
    shifting: any = {infractions: [], notes:''};
    rightOfWay: any = {infractions: [], notes:''};
    uncoupling: any = {infractions: [], notes:''};
    coupling: any = {infractions: [], notes:''};

    examLoadedFromDB: any = null;
    client: FormGroup;
    examiner: FormGroup;
    results: FormGroup;
    toastControl: ToastController;
    alertCtrl: AlertController;

    homeTabEnabled: boolean = true;
    detailsTabEnabled: boolean = false;
    examinationTabEnabled: boolean = false;
    examRevision: any = 0;
    attachments: any = [];
    signatureImg: any;

    detailsCanvas;
    examinationCanvases;
    attachmentNames = [
        'left-turn-comments.png',
        'right-turn-comments.png',
        'road-position-comments.png',
        'speed-comments.png',
        'backing-comments.png',
        'shifting-comments.png',
        'right-of-way-comments.png',
        'uncoupling-comments.png',
        'coupling-comments.png',
        'signature.png'
    ];

    drawingToggle: any = false;

    currentColour: string = 'primary';
    brushSize: number = 10;

    currentExam = {
        _id: null,
        _rev: null,
        licenseClass: null,
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
        results: null,
        _attachments: {}
    };

    licenseClass: any = '1';
    detailsPage: any = null;
    examinationPage: any = null;

    constructor(toastControl: ToastController,
        formBuilder: FormBuilder,
        alertControl: AlertController) {
        this.toastControl = toastControl;
        this.alertCtrl = alertControl;

        this.client = formBuilder.group({
            dlNumber: [''],
            surname: ['', Validators.compose([Validators.maxLength(30), Validators.required])],
            givenName: ['', Validators.compose([Validators.maxLength(30), Validators.required])]
        })
    
        this.examiner = formBuilder.group({
            apptTime: ['', Validators.compose([Validators.required])],
            unit: ['', Validators.compose([Validators.maxLength(10), Validators.required])],
            route: ['', Validators.compose([Validators.maxLength(10), Validators.required])],
            apptDate: ['', Validators.compose([Validators.required])],
            office: ['', Validators.compose([Validators.required])],
            initials: ['', Validators.compose([Validators.maxLength(3), Validators.required])]
        });

        this.results = formBuilder.group({
            qualified: ['Discontinued', Validators.compose([Validators.required])],
            dangerousAction: ['', Validators.compose([Validators.maxLength(100)])],
            trafficViolation: ['', Validators.compose([Validators.maxLength(100)])],
            other: ['', Validators.compose([Validators.maxLength(100)])],
        });
   }

    getDemeritCount(infractionType) {

        let count: number = 0;
    
        for (let idx=0; idx < infractionType.infractions.length; idx++) {
            if (infractionType.infractions[idx] !== null) {
                count += eval(infractionType.infractions[idx].demerits);
            }
        }
    
        return count;
    }
    
    getTotalDemeritCount() {

        let count: number = 0;

        count = this.getDemeritCount(this.leftTurn) +
                this.getDemeritCount(this.rightTurn) +
                this.getDemeritCount(this.roadPosition) +
                this.getDemeritCount(this.speed) +
                this.getDemeritCount(this.backing) +
                this.getDemeritCount(this.shifting) +
                this.getDemeritCount(this.rightOfWay) +
                this.getDemeritCount(this.uncoupling) +
                this.getDemeritCount(this.coupling);
    
        return count;
    }  
    
    badgeColor(length) {
        if (length == 0) {
          return 'good';
        } else {
          return 'bad';
        }
    }

    presentToast(message) {
        const toast = this.toastControl.create({
          message: message,
          duration: 2000
        });
        toast.present();
    }

    prepareCurrentExam() {

        if (!this.client.valid) {
          this.presentToast("Client data not valid");
          return { valid: false };
        } else if (!this.examiner.valid) {
          this.presentToast("Examination data not valid");
          return { valid: false };
        }
        
        this.currentExam.licenseClass = this.licenseClass;
        this.currentExam.client = this.client.value;
        this.currentExam.examiner = this.examiner.value;
        this.currentExam.leftTurn = this.leftTurn;
        this.currentExam.rightTurn = this.rightTurn;
        this.currentExam.roadPosition = this.roadPosition;
        this.currentExam.speed = this.speed;
        this.currentExam.backing = this.backing;
        this.currentExam.shifting = this.shifting;
        this.currentExam.rightOfWay = this.rightOfWay;
        this.currentExam.uncoupling = this.uncoupling;
        this.currentExam.coupling = this.coupling;
        this.currentExam.results = this.results.value;
        return { valid: true };
    }

    presentBasicAlert(aType, message) {
        let alert = this.alertCtrl.create({
            title: aType,
            subTitle: message,
            buttons: ['Dismiss']
        });
        alert.present();
    }

    loadAttachments(dbProvider) {
        if (this.detailsPage !== null) {
            this.readDetailsAttachments(dbProvider);
        } else {
            if (this.examinationPage !== null) {
                this.readExamAttachments(dbProvider);
            }
        }
    }

    readDetailsAttachments(dbProvider) {
        let canvasArray = this.detailsPage.signaturePad.toArray();
        console.log("Signature being read for id: " + this.currentExam._id);
        dbProvider.db.getAttachment(this.currentExam._id, 'signature.png')
        .then((blob) => {
          let url = URL.createObjectURL(blob);
          canvasArray[0].drawBackground(url);
       })
        .catch (e => {
            // Easiest way to test for non-existent attachment (not most efficient though)
            console.log("Can't find attachment: " + e);
            canvasArray[0].drawBackground(null);
          }) 
    }
  
    readExamAttachments(dbProvider) {
    for (let idx=0; idx < this.examinationPage.commentArray.length; idx++) {
      dbProvider.db.getAttachment(this.currentExam._id, this.attachmentNames[idx])
      .then((blob) => {
        let url = URL.createObjectURL(blob);
        this.examinationPage.commentArray[idx].drawBackground(url);
        this.examinationPage.commentArray[idx].wasLoaded = true;
      })
      .catch (e => {
          // Easiest way to test for non-existent attachment (not most efficient though)
          console.log("Can't find attachment: " + e);
          this.examinationPage.commentArray[idx].drawBackground(null);
        }) 
      }
  }
  
}
