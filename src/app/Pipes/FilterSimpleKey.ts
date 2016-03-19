import {Pipe} from "angular2/core";

@Pipe({
    name : 'filterSimpleKey'
})
export class FilterSimpleKey {
    transform(collection :  any[], arg : string []) : any[] {

        var key = (arg[0] == "number") ? parseInt(arg[2]) : arg[2];
        return collection.filter((item : any) => item[arg[1]].id == key);
    }
}