import { Component } from '@angular/core';

import { DetailsPage } from '../details/details';
import { ExaminationPage } from '../examination/examination';
import { HomePage } from '../home/home';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = DetailsPage;
  tab3Root = ExaminationPage;

  constructor() {

  }
}
