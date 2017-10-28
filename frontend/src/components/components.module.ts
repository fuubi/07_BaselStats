import { NgModule } from '@angular/core';
import { SearchComponent } from './search/search';
import { IonicModule } from 'ionic-angular';
import { SearchService } from './search/search.service';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { QueriesBoxComponent } from './queries-box/queries-box';
@NgModule({
    declarations: [
        SearchComponent,
        QueriesBoxComponent
    ],
    imports: [
        IonicModule,
        HttpModule
    ],
    exports: [
        SearchComponent,
        QueriesBoxComponent
    ],
    providers: [
        SearchService
    ]
})
export class ComponentsModule {
}
