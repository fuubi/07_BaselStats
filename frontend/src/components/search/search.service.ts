import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Http } from '@angular/http';

@Injectable()
export class SearchService {
    private allItems: Observable<string>;
    private queriedItemsList: string[] = [];
    public queriedItems: Subject<string[]> = new Subject();

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

    addQueriedItem(item:string) {
        this.queriedItemsList.push(item);
        this.queriedItems.next(this.queriedItemsList)
    }


    removeQueriedItem(item: string) {
        let idx = this.queriedItemsList.indexOf(item)
        if (idx > -1) {
            this.queriedItemsList.splice(idx, 1);
        }
        this.queriedItems.next(this.queriedItemsList)
    }
}