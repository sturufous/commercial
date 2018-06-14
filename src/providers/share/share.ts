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

    homeTabEnabled: boolean = true;
    detailsTabEnabled: boolean = false;
    examinationTabEnabled: boolean = false;

    currentExam = {
        _id: null,
        _rev: null,
        client: null,
        examiner: null
    };

    licenseClass: any = '1';

    constructor(toastControl: ToastController,
                formBuilder: FormBuilder) {
        this.toastControl = toastControl;

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
            telephone: ['', Validators.compose([Validators.required])],
            initials: ['', Validators.compose([Validators.maxLength(3), Validators.required])]
        });
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

   presentToast(message) {
        const toast = this.toastControl.create({
          message: message,
          duration: 1500
        });
        toast.present();
    }
    
}
