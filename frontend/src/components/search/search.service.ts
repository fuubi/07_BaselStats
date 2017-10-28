import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class SearchService {
    private allItems = ['Hi', 'Bla'];

    constructor() {

    }

    getPredictions(query: string): Observable<string> {
        console.log("Searching for " + query);
        return Observable.from(this.allItems)
            .filter((item: string) => item.startsWith(query));

    }
}