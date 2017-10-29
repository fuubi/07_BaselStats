import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MapService } from './map.service';
import { single, multi } from './data';
import { TreeMapComponent } from '@swimlane/ngx-charts';

@Component({
    selector: 'map-chart',
    templateUrl: 'map-chart.html'
})
export class MapChartComponent {
    single: any[] = single;
    multi: any[] = multi;

    view: any[] = [700, 400];

    // options
    gradient = false;

    colorScheme = {
        domain: ['#b24d4e', '#577b98', '#659663', '#88638e', '#bf7f40', '#cccc66', '#865e48', '#da9ebe', '#999999', '#b24d4e', '#577b98', '#659663', '#88638e', '#bf7f40', '#cccc66', '#865e48', '#da9ebe', '#999999', '#b24d4e', '#577b98', '#659663', '#88638e', '#bf7f40', '#cccc66', '#865e48', '#da9ebe', '#999999', '#b24d4e', '#577b98', '#659663', '#88638e', '#bf7f40', '#cccc66', '#865e48', '#da9ebe', '#999999', '#b24d4e', '#577b98', '#659663', '#88638e', '#bf7f40', '#cccc66', '#865e48', '#da9ebe', '#999999', '#b24d4e', '#577b98', '#659663', '#88638e', '#bf7f40']
    };

    valueFormatting = (data) => {
        return data.value;
    };

    constructor(private mapService: MapService,
                private ref: ChangeDetectorRef) {

        this.mapService.data.asObservable()
            .subscribe(a => {
                console.log("allo")
                console.log(this.single)
                this.single.push({
                    "name": "Gey",
                    "value": 23923323
                });
                console.log("after")
                this.single = [...single];
                this.ref.detectChanges();
            });


    }

    onSelect(event) {
        console.log(event);
    }

}
