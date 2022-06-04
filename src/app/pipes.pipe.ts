import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'filter',
    pure: false
})
export class FilterPipe implements PipeTransform {
    transform(items: any[], term: any) {
        console.log('term', term);
        return term
            ? items.filter(function(item) {
                var it = item.action.toLowerCase();
                var tm = term.toLowerCase();
                return it.indexOf(tm) !== -1;
            })
            : items;
    }
}
@Pipe({
    name: 'sort'
})
export class SortByPipe implements PipeTransform {
    transform(items: any[], order: string): any {
        if(order == 'ASC') {
            return items.sort((a, b) => {
                return b['timestamp'] - a['timestamp']}
                );
        } else {
            return items.sort((a, b) => {
                return a['timestamp'] - b['timestamp']}
                );
        }
    }
}
@Pipe({ name: 'sortScores' })
export class SortScoresPipe implements PipeTransform {
    transform(items: any[], order: string): any {
        if(order == 'ASC') {
            return items.sort((a, b) => {
                return b['score'] - a['score']}
                );
        } else {
            return items.sort((a, b) => {
                return a['score'] - b['score']}
                );
        }
    }
}
