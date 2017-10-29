import { Injectable } from '@angular/core';
import { LineChartData, LineChartColors } from './model';
import { Observable, Subject } from 'rxjs';
import { SearchService } from '../search/search.service';
import { multi } from './data';

@Injectable()
export class ChartService {
    public data: Subject<any>  = new Subject();
    constructor(private searchService: SearchService) {
        this.searchService.queriedItems
            .asObservable()
            .subscribe(d => {
                this.data.next(multi)
            });

    }
}