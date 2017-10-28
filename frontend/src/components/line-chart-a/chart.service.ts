import { Injectable } from '@angular/core';
import { LineChartData } from './model';
import { Observable } from 'rxjs';

@Injectable()
export class ChartService {
    private lineChartData: Observable<LineChartData[]>;
    private lineChartLabels: Observable<string[]>;
    public lineChartColors: any[] = LINE_CHART_COLOR;

    constructor() {
        this.lineChartLabels =
            Observable.of(
                ['January', 'February', 'March', 'April', 'May', 'June', 'July']
            );
        this.lineChartData =
            Observable.of([
                {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
                {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
                {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
            ]);
    }

    public getLineChartData() {
        return this.lineChartData;
    }

    public getLabels() {
        return this.lineChartLabels;
    }

    public getChartColorShema() {
        return this.lineChartColors;
    }
}


let LINE_CHART_COLOR: Array<any> = [
    { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
        backgroundColor: 'rgba(77,83,96,0.2)',
        borderColor: 'rgba(77,83,96,1)',
        pointBackgroundColor: 'rgba(77,83,96,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
];


