import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Http, Headers, RequestOptions, HttpModule } from '@angular/http';

import { ExaminationPage } from '../pages/examination/examination';
import { DetailsPage } from '../pages/details/details';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ShareProvider } from '../providers/share/share';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TextMaskModule } from 'angular2-text-mask';
import { Geolocation } from '@ionic-native/geolocation';
import { CommercialDbProvider } from '../providers/commercial-db/commercial-db';
import { CanvasDrawComponent } from '../components/canvas-draw/canvas-draw';
import { IntersectionsPage } from '../pages/intersections/intersections';

@NgModule({
  declarations: [
    MyApp,
    ExaminationPage,
    DetailsPage,
    HomePage,
    TabsPage,
    CanvasDrawComponent,
    IntersectionsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    TextMaskModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ExaminationPage,
    DetailsPage,
    HomePage,
    TabsPage,
    CanvasDrawComponent,
    IntersectionsPage
  ],
  providers: [
    StatusBar,
    Geolocation,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ShareProvider,
    CommercialDbProvider
  ]
})
export class AppModule {}
