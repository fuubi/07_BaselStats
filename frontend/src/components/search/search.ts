import { Component } from '@angular/core';
import { SearchService } from './search.service';

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
export class SearchComponent {
    autocompleteItems;
    autocomplete;

    text: string;

    constructor(private searchService:SearchService) {
        this.autocompleteItems = [];
        this.autocomplete = {
            query: ''
        };
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
            });
    }

    itemSelected(item): void {
        this.autocomplete.query = item;
    }

}
