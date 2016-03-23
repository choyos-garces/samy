import {Pipe} from "angular2/core";

@Pipe({
    name : 'filterProperty'
})
export class FilterPropertyPipe {
    transform(collection :  any[], arg : string []) : any[] {
        if(typeof collection == "undefined") return collection;
        var term = (arg[0] == "number") ? parseInt(arg[2]) : arg[2];
        return (typeof collection != "undefined" ) ? collection.filter((item) => item[arg[1]] == term ) : collection;
    }
}