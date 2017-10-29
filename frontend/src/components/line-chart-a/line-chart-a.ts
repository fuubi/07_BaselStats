import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ChartService } from './chart.service';
import { single, multi } from './data';

@Component({
    selector: 'line-chart-a',
    templateUrl: 'line-chart-a.html'
})
export class LineChartAComponent {
    single: any[] = single;
    multi: any[] = [];

    view: any[] = [700, 400];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = true;
    showXAxisLabel = true;
    xAxisLabel = 'Jahr';
    showYAxisLabel = true;
    xAxisTickFormatting = (data) =>  data;
    yAxisTickFormatting = (data) => data;
    yAxisLabel = 'Anzahl oder Anteil';

    colorScheme = {
        domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
    };

    // line, area
    autoScale = true;


    constructor(private chartService: ChartService) {

        this.chartService.data.asObservable()
            .subscribe(a => {

                this.multi.push(a);
                this.multi = [...this.multi];

            });


    }

    onSelect(event) {
        console.log(event);
    }

}
