import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import {SearchService, ValueKey} from '../search/search.service';

/**
 * Generated class for the QueriesBoxComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'queries-box',
    templateUrl: 'queries-box.html'
})
export class QueriesBoxComponent {

    queries: ValueKey[];


    constructor(private searchService: SearchService) {
        console.log('Hello QueriesBoxComponent Component');
        searchService.queriedItems.asObservable()
            .subscribe(queries => {
                this.queries = queries;
            })
    }

    removeQueriedItem(item: ValueKey) {
        this.searchService.removeQueriedItem(item);
    }

}
