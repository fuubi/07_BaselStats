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
    multi: any[] = [];

    view: any[] = [
        window.innerWidth - 0.3 * window.innerWidth,
        window.innerHeight - 0.3 * window.innerHeight];

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

    constructor(private mapService: MapService,
                private ref: ChangeDetectorRef) {

        this.mapService.data.asObservable()
            .subscribe(a => {

                // this.single.push(a);
                this.single = a;
                // this.single = [...this.single];

            });
    }

    onSelect(event) {
        //console.log(event);
    }

}