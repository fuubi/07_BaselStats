import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ApiPage } from './api';

@NgModule({
  declarations: [
    ApiPage,
  ],
  imports: [
    IonicPageModule.forChild(ApiPage),
  ],
})
export class ApiPageModule {}
