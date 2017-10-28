import { Component } from '@angular/core';

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

    constructor() {
        this.autocompleteItems = [];
        this.autocomplete = {
            query: ''
        };
    }

    updateSearch(): void {

        console.log(this.autocomplete.query)

        if (this.autocomplete.query == '') {
            this.autocompleteItems = [];
            return;
        }
        this.autocompleteItems = ['hello', 'wolirld'];
        /*    let me = this;
         this.service.getPlacePredictions({ input: this.autocomplete.query,
         componentRestrictions: {country: 'TH'} },
         function (predictions, status) {
         me.autocompleteItems = [];
         me.zone.run(function () {
         predictions.forEach(function (prediction) {
         me.autocompleteItems.push(prediction.description);
         });
         });
         });*/

    }

    itemSelected(item): void {
        console.log(item)
    }

}
