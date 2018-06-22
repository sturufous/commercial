import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GraphicToolsPage } from './graphic-tools';

@NgModule({
  declarations: [
    GraphicToolsPage,
  ],
  imports: [
    IonicPageModule.forChild(GraphicToolsPage)
  ]
})
export class GraphicToolsModule {}
