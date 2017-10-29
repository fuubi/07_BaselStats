import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Http } from '@angular/http';
import constants from '../../constants';

@Injectable()
export class SearchService {
    private allItems: Observable<string>;
    private queriedItemsList: string[] = [];
    public queriedItems: Subject<string[]> = new Subject();

    constructor(private http:Http) {
        this.allItems = Observable.from(['hi', 'foo', 'baa', 'auto']);

        // this.allitems = this.getPredictions();


    }

    getPredictions(query: string): Observable<string> {
        console.log("Searching for " + query );
        return this.http.get("http://localhost:5000"+'/auto?term='+query).map(response => {
            const data = response.json();

            return data
            console.log("Test"+JSON.stringify(data));

            return "Test";
            /*return data.body.map(row => {
                return row[1];
            });

            const key = data[0];
            const title = data[1];
            console.log("Test"+JSON.stringify(data));*/
            //return data['body'];
        });
        /*return this.allItems
            .filter((item: string) => item.startsWith(query));*/
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