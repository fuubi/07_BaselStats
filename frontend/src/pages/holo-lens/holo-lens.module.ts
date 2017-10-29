import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HoloLensPage } from './holo-lens';

@NgModule({
  declarations: [
    HoloLensPage,
  ],
  imports: [
    IonicPageModule.forChild(HoloLensPage),
  ],
})
export class HoloLensPageModule {}
