import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Http } from '@angular/http';
import { BASE_URL } from '../../constants';

@Injectable()
export class SearchService {
    private allItems: Observable<string>;
    private queriedItemsList: ValueKey[] = [];
    public queriedItems: Subject<ValueKey[]> = new Subject();
    public removeItemWithIndex: Subject<number> = new Subject();

    constructor(private http:Http) {

    }

    getPredictions(query: string): Observable<ValueKey> {
        console.log("Searching for " + query );
        return this.http.get(BASE_URL.BASE_URL_BACKEND+'auto?term='+query)
            .map(response => response.json())
            .concatMap(vk => {
                console.log(BASE_URL.BASE_URL_BACKEND+'auto?term='+query)
                console.log(vk)
                return Observable.from(vk)
                    .map(vk => new ValueKey(vk))

            })
            .do(console.log);
    }

    addQueriedItem(item: ValueKey) {
        this.queriedItemsList.push(item);
        this.queriedItems.next(this.queriedItemsList)
    }


    removeQueriedItem(item: ValueKey) {
        let idx = this.queriedItemsList.indexOf(item)
        if (idx > -1) {
            this.queriedItemsList.splice(idx, 1);
            this.removeItemWithIndex.next(idx);
        }

    }
}

export class ValueKey {
    public value:string;
    public key:string;

    constructor(valueKey:any){
        this.key = valueKey[0];
        this.value = valueKey[1];
    }

}