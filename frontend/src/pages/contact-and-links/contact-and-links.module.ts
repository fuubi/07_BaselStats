import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContactAndLinksPage } from './contact-and-links';

@NgModule({
  declarations: [
    ContactAndLinksPage,
  ],
  imports: [
    IonicPageModule.forChild(ContactAndLinksPage),
  ],
})
export class ContactAndLinksPageModule {}
