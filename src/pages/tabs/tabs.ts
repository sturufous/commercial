import { Component } from '@angular/core';

import { DetailsPage } from '../details/details';
import { ExaminationPage } from '../examination/examination';
import { HomePage } from '../home/home';
import { ShareProvider } from '../../providers/share/share';
import { IntersectionsPage } from '../intersections/intersections';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = DetailsPage;
  tab3Root = ExaminationPage;
  tab4Root = IntersectionsPage;

  sharedData: ShareProvider;

  constructor(shareProvider: ShareProvider) {
    this.sharedData = shareProvider;
  }
}
