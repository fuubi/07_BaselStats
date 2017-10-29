import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Http } from '@angular/http';
import { SearchService, ValueKey } from '../search/search.service';
import { BASE_URL } from '../../constants';

@Injectable()
export class ChartService {
    public data: Subject<any> = new Subject();

    constructor(private searchService: SearchService, private http: Http) {

        this.searchService.queriedItems
            .asObservable()
            .concatMap(vk =>
                vk.length > 0 ? this.getSearchResult(vk[vk.length - 1]) : []
            )
            .do(console.log)

            .subscribe(d => {
                console.log(d)
                this.data.next({
                    "name": "Gey",
                    "series": [
                        {
                            "name": "2010",
                            "value": 700000
                        },
                        {
                            "name": "2011",
                            "value": 8940000
                        }
                    ]
                })
            })
    }

    public getSearchResult(d: ValueKey): Observable<SearchResults> {
        const request = BASE_URL.BASE_URL_BACKEND + 'stats/' + d.key;
        return this.http.get(request)
            .map(response => response.json())

            .map(resultList => {
                console.log(resultList)

                return new LineChartModel(resultList)
            });
    }
}

export class SearchResults {
    public key: string;
    public sum: number;

    constructor(searchResult: any) {
        this.key = searchResult.key;
        this.sum = searchResult.sum.value;
    }

}

export class LineChartModel {
    public name: string;
    public series: ValueName[] = [];

    constructor(resultList: any[]) {
        this.name = "hi";
        Observable.from(resultList)
            .map(result => new SearchResults(result))
            .subscribe(resultList => this.series.push(resultList))

    }

}


export class ValueName {
    public value: string;
    public name: string;

    constructor(searchResult: any) {
        this.value = searchResult.key;
        this.name = searchResult.sum.value;
    }

}