import { NgModule } from '@angular/core';
import { SearchComponent } from './search/search';
import { IonicModule } from 'ionic-angular';
import { SearchService } from './search/search.service';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { QueriesBoxComponent } from './queries-box/queries-box';
import { LineChartAComponent } from './line-chart-a/line-chart-a';
import { ChartsModule } from 'ng2-charts';
@NgModule({
    declarations: [
        SearchComponent,
        QueriesBoxComponent,
    LineChartAComponent
    ],
    imports: [
        IonicModule,
        HttpModule,
        ChartsModule
    ],
    exports: [
        SearchComponent,
        QueriesBoxComponent,
    LineChartAComponent
    ],
    providers: [
        SearchService
    ]
})
export class ComponentsModule {
}
