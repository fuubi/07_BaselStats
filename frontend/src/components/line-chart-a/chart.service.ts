import { Injectable } from '@angular/core';
import { LineChartData, LineChartColors } from './model';
import { Observable } from 'rxjs';

@Injectable()
export class ChartService {
    private lineChartData: Observable<LineChartData[]>;
    private lineChartLabels: Observable<string[]>;
    public lineChartColors: any[];

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

        this.lineChartColors = this.getChartColor(3);
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

    private getChartColor(count: Number) {
        let lineChartColors: LineChartColors[] = [];
        for (let i = 0; i < count; i++) {
            let h: string = String(i / count);
            let lc: LineChartColors = {
                backgroundColor: 'hsla(' + h + '0, 52%, 66%, 0.3)',
                borderColor: 'hsla(' + h + ', 52%, 66%, 1)',
                pointBackgroundColor: 'hsla(' + h + ', 52%, 66%, 1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'hsla(' + h + ', 52%, 66%, 1)'
            };

            lineChartColors.push(lineChartColors);
        }
    }
}




