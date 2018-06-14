import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastController } from 'ionic-angular';

/*
  Generated class for the ShareProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
 
@Injectable()
export class ShareProvider {

    leftTurn: any = [];
    rightTurn: any = [];
    roadPosition: any = [];
    speed: any = [];
    backing: any = [];
    shifting: any = [];
    rightOfWay: any = [];
    uncoupling: any = [];
    coupling: any = [];

    examLoadedFromDB: any = null;
    client: FormGroup;
    examiner: FormGroup;
    toastControl: ToastController;

    currentExam = {
        _id: null,
        _rev: null,
        client: null,
        examiner: null
    };

    licenseClass: any = '1';

    constructor(toastControl: ToastController) {
        this.toastControl = toastControl;
    }

    getDemeritCount(infractionType) {

        let count: number = 0;
    
        for (let idx=0; idx < infractionType.length; idx++) {
            if (infractionType[idx] !== null) {
                count += eval(infractionType[idx].demerits);
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

    initializeExam() {

        if (this.examLoadedFromDB == null) {
            this.currentExam.client = {
                dlNumber: '',
                surname: 'undefined', 
                givenName: 'undefined'
            };
            this.currentExam.examiner = {
                apptDate: '', 
                apptTime: '',
                unit: '',
                route: '',
                telephone: '',
                initials: ''
            }; 
        } else {
            this.currentExam.client = this.examLoadedFromDB.client;
            this.currentExam.examiner = this.examLoadedFromDB.examiner;
            this.currentExam._id = this.examLoadedFromDB.id;
            this.currentExam._rev = this.examLoadedFromDB.rev;
        }
    }

    presentToast(message) {
        const toast = this.toastControl.create({
          message: message,
          duration: 3000
        });
        toast.present();
    }
    
}
