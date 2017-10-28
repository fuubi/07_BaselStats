import { NgModule } from '@angular/core';
import { SearchComponent } from './search/search';
import { IonicModule } from 'ionic-angular';
@NgModule({
	declarations: [SearchComponent],
	imports: [IonicModule],
	exports: [SearchComponent]
})
export class ComponentsModule {}
