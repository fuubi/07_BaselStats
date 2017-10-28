import { Component } from '@angular/core';
import { ChartService } from './chart.service';
import { LineChartData } from './model';

@Component({
    selector: 'line-chart-a',
    templateUrl: 'line-chart-a.html'
})
export class LineChartAComponent {
    public lineChartData: LineChartData[];
    public lineChartLabels: string[];

    public lineChartOptions: any = {responsive: true};
    public lineChartColors: any[];
    public lineChartLegend: boolean = true;
    public lineChartType: string = 'line';

    constructor(private chartService: ChartService) {
        chartService.getLineChartData()
            .subscribe(d => {
                this.lineChartData = d;
            });

        chartService.getLabels()
            .subscribe(l => {
                    this.lineChartLabels = l
                }
            );

        this.lineChartColors = chartService.getChartColorShema();


    }


    // events
    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}
