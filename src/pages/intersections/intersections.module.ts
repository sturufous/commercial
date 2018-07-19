import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IntersectionsPage } from './intersections';
import { ComponentsModule } from '../../components/components.module';

@NgModule({
  declarations: [
    IntersectionsPage,
  ],
  imports: [
    IonicPageModule.forChild(IntersectionsPage),
    ComponentsModule
  ]
})
export class IntersectionsPageModule {}
