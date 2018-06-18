import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IntersectionsPage } from './intersections';

@NgModule({
  declarations: [
    IntersectionsPage,
  ],
  imports: [
    IonicPageModule.forChild(IntersectionsPage),
  ],
})
export class IntersectionsPageModule {}
