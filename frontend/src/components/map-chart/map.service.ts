import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Http} from '@angular/http';
import {SearchService, ValueKey} from '../search/search.service';
import {BASE_URL} from '../../constants';
import {SearchResults} from "../line-chart-a/chart.service";

@Injectable()
export class MapService {
    public data: Subject<any> = new Subject();

    constructor(private searchService: SearchService, private http: Http) {
        this.searchService.queriedItems
            .asObservable()
            .concatMap(vk =>
                    vk.length > 0 ? this.getSearchResult(vk[vk.length-1]) : []
            ).subscribe(console.log)
    }

    public getSearchResult(d: ValueKey): Observable<SearchResults> {
        const request = BASE_URL.BASE_URL_BACKEND + '/mapstats/' + d.key;
        return this.http.get(request)
            .map(response => response.json())
            .concatMap(resultList => {
                return Observable.from(resultList)
                    .map(result => new SearchResults(result))
            });
    }
}
