import { NgModule } from '@angular/core';
import { SearchComponent } from './search/search';
import { IonicModule } from 'ionic-angular';
import { SearchService } from './search/search.service';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { QueriesBoxComponent } from './queries-box/queries-box';
import { LineChartAComponent } from './line-chart-a/line-chart-a';
import { ChartsModule } from 'ng2-charts';
import { ChartService } from './line-chart-a/chart.service';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MapChartComponent } from './map-chart/map-chart';
import { MapService } from "./map-chart/map.service";

@NgModule({
    declarations: [
        SearchComponent,
        QueriesBoxComponent,
        LineChartAComponent,
        MapChartComponent,
    ],
    imports: [
        IonicModule,
        HttpModule,
        ChartsModule,
        BrowserAnimationsModule,
        NgxChartsModule
    ],
    exports: [
        SearchComponent,
        QueriesBoxComponent,
        LineChartAComponent,
        MapChartComponent,
    ],
    providers: [
        SearchService,
        ChartService,
        MapService,
    ]
})
export class ComponentsModule {
}
