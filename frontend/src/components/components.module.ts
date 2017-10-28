import { NgModule } from '@angular/core';
import { SearchComponent } from './search/search';
import { IonicModule } from 'ionic-angular';
import { SearchService } from './search/search.service';
@NgModule({
	declarations: [SearchComponent],
	imports: [IonicModule],
	exports: [SearchComponent],
	providers: [
		SearchService
	]
})
export class ComponentsModule {}
