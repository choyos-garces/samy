import {Pipe} from "angular2/core";

@Pipe({
    name : 'filterSimpleKey'
})
export class FilterSimpleKey {
    transform(collection :  any[], arg : string []) : any[] {
        var key = arg[1];
        return (typeof collection != "undefined" && typeof arg[0] != "undefined") ? collection.filter((item : any) => {
            return item[arg[0]].id == key;
        }) : collection;
    }
}