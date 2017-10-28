import { Component } from '@angular/core';
import { ChartService } from './chart.service';
import { single, multi } from './data';

@Component({
    selector: 'line-chart-a',
    templateUrl: 'line-chart-a.html'
})
export class LineChartAComponent {
    single: any[]  = single;
    multi: any[]  = multi;

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


    }

    onSelect(event) {
        console.log(event);
    }

}
