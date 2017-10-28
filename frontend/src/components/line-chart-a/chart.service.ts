import { Injectable } from '@angular/core';
import { LineChartData } from './model';
import { Observable } from 'rxjs';

@Injectable()
export class ChartService {
    private lineChartData: Observable<LineChartData[]> = Observable.of([
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
        {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
    ]);


    public getLineChartData() {
        return this.lineChartData;
    }
}


