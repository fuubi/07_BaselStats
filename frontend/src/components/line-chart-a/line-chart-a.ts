import { Component, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ChartService } from './chart.service';
import { single, multi } from './data';
import { SearchService } from '../search/search.service';

@Component({
    selector: 'line-chart-a',
    templateUrl: 'line-chart-a.html'
})
export class LineChartAComponent {
    single: any[] = single;
    multi: any[] = [];

    view: any[] = [
        window.innerWidth - 0.2 * window.innerWidth,
        window.innerHeight - 0.2 * window.innerHeight];

    // options
    showXAxis = true;
    showYAxis = true;
    gradient = false;
    showLegend = false;
    showXAxisLabel = true;
    xAxisLabel = 'Jahr';
    showYAxisLabel = true;
    xAxisTickFormatting = (data) =>  data;
    yAxisTickFormatting = (data) => data;
    yAxisLabel = 'Anzahl oder Anteil';

    colorScheme = {
        domain:
            ['#b24d4e ', '#577b98 ', '#659663 ', '#88638e ',
                '#bf7f40 ', '#cccc66 ', '#865e48 ', '#da9ebe ',
                '#999999 ', '#b24d4e ', '#577b98 ', '#659663 ',
                '#88638e ', '#bf7f40 ', '#cccc66 ', '#865e48 ', '#da9ebe ',
                '#999999 ', '#b24d4e ', '#577b98 ', '#659663 ', '#88638e ',
                '#bf7f40 ', '#cccc66 ', '#865e48 ', '#da9ebe ', '#999999 ',
                '#b24d4e ', '#577b98 ', '#659663 ', '#88638e ', '#bf7f40 ',
                '#cccc66 ', '#865e48 ', '#da9ebe ', '#999999 ', '#b24d4e ',
                '#577b98 ', '#659663 ', '#88638e ', '#bf7f40 ', '#cccc66 ',
                '#865e48 ', '#da9ebe ', '#999999 ', '#b24d4e ', '#577b98 ',
                '#659663 ', '#88638e ', '#bf7f40 ']
    };

    // line, area
    autoScale = true;


    constructor(private chartService: ChartService, private searchService:SearchService) {

        this.chartService.data.asObservable()
            .subscribe(a => {

                this.multi.push(a);
                this.multi = [...this.multi];

            });

        this.searchService.removeItemWithIndex.asObservable()
            .subscribe(index => {

                let next = [];
                for(let i = 0; i<this.multi.length;i++){
                    console.log(this.multi[i])
                    if (index != i){
                        next.push(this.multi[i])
                    }
                }
                console.log(next)
                this.multi = [...next]
            })



    }

    onSelect(event) {
        console.log(event);
    }

}
