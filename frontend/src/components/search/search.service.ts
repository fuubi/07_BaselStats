import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Http } from '@angular/http';
import { BASE_URL } from '../../constants';

@Injectable()
export class SearchService {
    private allItems: Observable<string>;

    constructor(private http:Http) {
        this.allItems = Observable.from(['hi', 'foo', 'baa', 'auto']);

    /*

    this.allitems = this.http.get(base_url.base_url_elastic)

    */

    }

    getPredictions(query: string): Observable<string> {
        console.log("Searching for " + query);
        return this.allItems
            .filter((item: string) => item.startsWith(query));
    }
}