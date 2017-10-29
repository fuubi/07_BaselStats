import { Component, Output, EventEmitter, OnInit, ViewChild } from '@angular/core';
import {SearchService,  ValueKey} from './search.service';
import { QueriesBoxComponent } from '../queries-box/queries-box';

/**
 * Generated class for the SearchComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
    selector: 'search',
    templateUrl: 'search.html'
})
export class SearchComponent implements OnInit{
    autocompleteItems: ValueKey[];
    autocomplete;
    queriedItems;
    text: string;

    constructor(private searchService:SearchService) {

    }

    ngOnInit(){
        this.autocompleteItems = [];
        this.autocomplete = {
            query: ''
        };

        this.queriedItems = ['hallo'];
    }

    updateSearch(): void {
        if (this.autocomplete.query == '') {
            this.autocompleteItems = [];
            return;
        }
        this.autocompleteItems = [];
        this.searchService.getPredictions(this.autocomplete.query)
            .subscribe(prediction => {
                this.autocompleteItems.push(prediction);
                console.log('next prediction' + prediction)
            });
    }

    itemSelected(item): void {
        this.searchService.addQueriedItem(item);
        this.autocomplete.query = '';
        this.updateSearch();
    }

}
