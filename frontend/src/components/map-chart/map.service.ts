import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Http} from '@angular/http';
import {SearchService, ValueKey} from '../search/search.service';
import {BASE_URL} from '../../constants';
import areas from './areas';
import _ from 'lodash';
import {SearchResults} from "../line-chart-a/chart.service";

@Injectable()
export class MapService {
    public data: Subject<any> = new Subject();

    constructor(private searchService: SearchService, private http: Http) {
        this.searchService.queriedItems
            .asObservable()
            .concatMap(vk =>
                    vk.length > 0 ? this.getSearchResult(vk[vk.length-1]) : []
            ).subscribe(d => {
                console.log(d)
                this.data.next(d)
        })
    }

    public getSearchResult(d: ValueKey): Observable<SingleChartModel> {
        const request = BASE_URL.BASE_URL_BACKEND + 'mapStats/' + d.key;
        return this.http.get(request)
            .map(response => response.json())
            .map(resultList => {
                return resultList.map((entry) => {
                    return new SingleChartModel(entry)
                })

            });
    }
}

export class SingleChartModel {
    public name: string;
    public value: string;

    constructor(result:any) {
        const area =_.find(areas, { 'id': result.key });

        this.name = area ? area.name : result.key;
        this.value = result.sum.value;
    }
}