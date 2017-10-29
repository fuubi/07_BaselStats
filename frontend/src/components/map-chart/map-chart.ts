import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MapService } from './map.service';
import { single, multi } from './data';
import { TreeMapComponent } from '@swimlane/ngx-charts';
import {SearchService} from "../search/search.service";

@Component({
    selector: 'map-chart',
    templateUrl: 'map-chart.html'
})
export class MapChartComponent {
    single: any[] = single;
    multi: any[] = [];

    view: any[] = [1400, 800];

    // options
    gradient = false;

    colorScheme = {
        domain: ['#b24d4e', '#577b98', '#659663', '#88638e', '#bf7f40', '#cccc66', '#865e48', '#da9ebe', '#999999', '#b24d4e', '#577b98', '#659663', '#88638e', '#bf7f40', '#cccc66', '#865e48', '#da9ebe', '#999999', '#b24d4e', '#577b98', '#659663', '#88638e', '#bf7f40', '#cccc66', '#865e48', '#da9ebe', '#999999', '#b24d4e', '#577b98', '#659663', '#88638e', '#bf7f40', '#cccc66', '#865e48', '#da9ebe', '#999999', '#b24d4e', '#577b98', '#659663', '#88638e', '#bf7f40', '#cccc66', '#865e48', '#da9ebe', '#999999', '#b24d4e', '#577b98', '#659663', '#88638e', '#bf7f40']
    };

    showedDiagram : number = 0;

    switchOtherMap = () => {
        this.showedDiagram = (this.showedDiagram+1) % 3;
    };

    valueFormatting = (data) => {
        return data.value;
    };

    constructor(private mapService: MapService, private searchService: SearchService,
                private ref: ChangeDetectorRef) {

        this.mapService.data.asObservable()
            .subscribe(a => {

                // this.single.push(a);
                this.single = a;
                // this.single = [...this.single];

            });

      /*  this.searchService.removeItemWithIndex.asObservable()
            .subscribe(index => {

                let next = [];
                for(let i = 0; i<this.single.length; i++){
                    console.log(this.single[i])
                    if (index != i){
                        next.push(this.single[i])
                    }
                }
                console.log(next)
                this.single = [...next]
            }) */
    }

    onSelect(event) {
        //console.log(event);
    }

}
