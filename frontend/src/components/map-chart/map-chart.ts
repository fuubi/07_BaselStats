import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MapService } from './map.service';
// import { single, multi } from './data';
import { BaseChartDirective } from 'ng2-charts';
import { LineChartComponent } from '@swimlane/ngx-charts';

@Component({
    selector: 'map-chart',
    templateUrl: 'map-chart.html'
})
export class LineChartAComponent {
    single: any[] = []; // single;
    multi: any[] = []; // multi;

    view: any[] = [700, 400];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Years';
    showYAxisLabel = true;
    yAxisLabel = 'Population';

    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

    // line, area
    autoScale = true;


    constructor(private mapService: MapService,
                private ref: ChangeDetectorRef) {

        this.mapService.data.asObservable()
            .subscribe(a => {
                console.log("allo")
                console.log(this.multi)
                this.multi.push({
                    "name": "Gey",
                    "series": [
                        {
                            "name": "2010",
                            "value": 700000
                        },
                        {
                            "name": "2011",
                            "value": 8940000
                        }
                    ]
                });
                console.log("after")
                //this.multi = [...multi];
                this.ref.detectChanges();
            });


    }

    onSelect(event) {
        console.log(event);
    }

}
