import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ChartService } from './chart.service';
import { single, multi } from './data';
import { BaseChartDirective } from 'ng2-charts';
import { LineChartComponent } from '@swimlane/ngx-charts';

@Component({
    selector: 'line-chart-a',
    templateUrl: 'line-chart-a.html'
})
export class LineChartAComponent {
    single: any[] = single;
    multi: any[] = multi;

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


    constructor(private chartService: ChartService) {

        this.chartService.data.asObservable()
            .subscribe(a => {

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
                this.multi = [...multi];
                this.ref.detectChanges();
            });


    }

    onSelect(event) {
        console.log(event);
    }

}
