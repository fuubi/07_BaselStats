import { NgModule } from '@angular/core';
import { SearchComponent } from './search/search';
import { IonicModule } from 'ionic-angular';
import { SearchService } from './search/search.service';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
@NgModule({
	declarations: [SearchComponent],
	imports: [IonicModule, HttpModule],
	exports: [SearchComponent],
	providers: [
		SearchService
	]
})
export class ComponentsModule {}
