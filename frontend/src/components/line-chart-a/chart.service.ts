import { Injectable } from '@angular/core';
import { LineChartData, LineChartColors } from './model';
import { Observable, Subject } from 'rxjs';
import { SearchService } from '../search/search.service';

@Injectable()
export class ChartService {
    private lineChartData: Subject<LineChartData[]> = new Subject();
    private lineChartLabels: Observable<string[]>;
    public lineChartColors: Subject<any[]> = new Subject();
    public dataMock: any[] = [
        {data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A'},
        {data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B'},
        {data: [18, 48, 77, 9, 100, 27, 40], label: 'Series C'}
    ];

    constructor(private searchService: SearchService) {
        this.lineChartLabels =
            Observable.of(
                ['January', 'February', 'March', 'April', 'May', 'June', 'July']
            );

        this.searchService.queriedItems.asObservable()
            .subscribe(queriedItems => {
                this.updateChart(queriedItems)
            })
    }

    public getLineChartData() {
        return this.lineChartData.asObservable();
    }


    public getLabels() {
        return this.lineChartLabels;
    }

    public getChartColorShema() {
        return this.lineChartColors.asObservable();
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

            lineChartColors.push(lc);
        }
        return lineChartColors
    }

    private updateChart(queriedItems: string[]) {
        console.log(queriedItems);
        this.lineChartColors.next(this.getChartColor(queriedItems.length));
        this.lineChartData.next(this.dataMock.slice(0,queriedItems.length));
        console.log(this.lineChartData)

    }

}




