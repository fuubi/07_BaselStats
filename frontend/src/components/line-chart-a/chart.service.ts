import { Injectable } from '@angular/core';
import { LineChartData, LineChartColors } from './model';
import { Observable, Subject } from 'rxjs';
import { SearchService } from '../search/search.service';

@Injectable()
export class ChartService {

    constructor(private searchService: SearchService) {

    }
}