import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ShareProvider } from '../../providers/share/share';
import { ModalController, ViewController } from 'ionic-angular';
import { Http, Headers, RequestOptions } from '@angular/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewChild } from '@angular/core';
import { CommercialDbProvider } from '../../providers/commercial-db/commercial-db';
import { CanvasDrawComponent } from '../../components/canvas-draw/canvas-draw';

/**
 * Generated class for the DetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

//@IonicPage()
@Component({
  selector: 'page-details',
  templateUrl: 'details.html',
})
export class DetailsPage {

  @ViewChild('testSlider') slider;
  @ViewChild(CanvasDrawComponent) signaturePad;

  dbProvider: CommercialDbProvider;
  sharedData: ShareProvider = null;
  modalController: ModalController = null;
  http: Http = null;
  client: FormGroup;
  examiner: FormGroup;
  submitAttempt: boolean = false;
  masks: any;
  phoneNumber: any;
  classes: any = ['1','3','2','4U','4-17']

  constructor(public navCtrl: NavController, 
    shareProvider: ShareProvider, 
    modalController: ModalController,
    dbProvider: CommercialDbProvider,
    http: Http,
    navparams: NavParams,
    public formBuilder: FormBuilder) {
      this.sharedData = shareProvider;
      this.modalController = modalController;
      this.http = http;
      this.dbProvider = dbProvider;

      console.log("Navparams = " + JSON.stringify(navparams));

      this.masks = {
        dlNumber: ['D', 'L', ':', /\d/, /\d/, /\d/, /\d/, /\d/, /\d/, /\d/],
        phoneNumber: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        cardNumber: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        cardExpiry: [/[0-1]/, /\d/, '/', /[1-2]/, /\d/],
        orderCode: [/[a-zA-z]/, ':', /\d/, /\d/, /\d/, /\d/]
    };
  }

  slideChanged() {
    this.sharedData.licenseClass = this.classes[this.slider.getActiveIndex()];
    console.log("License class = " + this.sharedData.licenseClass);
  }

  saveCurrentExam() {
    this.sharedData.prepareCurrentExam();
    this.dbProvider.updateExam(this.sharedData.currentExam);
    if (this.signaturePad.dirty) {
      this.signaturePad.canvas.nativeElement.toBlob((blob) => {
        console.log("Blob = " + JSON.stringify(blob));
        this.dbProvider.putAttachment(
          'signature.png', 
           blob);
      })
    };
  }

  redrawBackground(url) {    
    this.signaturePad.drawBackground(url);
  }

  ionViewDidEnter() {
    // Set offset of licensClass slider
    let idx=0;
    //console.log("ngAfterViewInit new: " + JSON.stringify(this.slider));
    while (this.sharedData.licenseClass != this.classes[idx]) {
      idx++;
    }
    this.slider.slideTo(idx);
    this.readAttachments();

    console.log('ionViewDidLoad DetailsPage');
  }

  readAttachments() {
      this.dbProvider.db.getAttachment(this.sharedData.currentExam._id, 'signature.png')
      .then((blob) => {
        let url = URL.createObjectURL(blob);
        this.signaturePad.drawBackground(url);
      })
      .catch (e => {
          // Easiest way to test for non-existent attachment (not most efficient though)
          console.log("Can't find attachment: " + e);
          this.signaturePad.drawBackground(null);
        }) 
      }
  }
