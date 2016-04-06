import {Pipe} from "angular2/core";

@Pipe({
    name : 'filterByQuery'
})
export class FilterByQueryPipe {
    transform( collection : any[], arg : any[]) {
        if(typeof arg[0] == "undefined" || typeof collection == "undefined") {
            return collection;
        }
        else {
            const query : Object = arg[0];
            const queryKeys = Object.keys(query);

            return collection.filter( item => {
                let flag = true;
                for(let i = 0; i < queryKeys.length; i++) {
                    const keyArr = queryKeys[i].split(".");
                    const keyQuery = query[queryKeys[i]];
                    const value = this.searchPropertyValue(item, keyArr);
                    if(this.compareValues(keyQuery, value) == false) flag = false;
                }

                return flag;
            });
        }
    }

    private searchPropertyValue(item, keyArr) {
        return (keyArr.length == 1) ? item[keyArr[0]] :
            this.searchPropertyValue(item[keyArr[0]],[...keyArr.slice(1)]);
    }
    
    private compareValues(query, value) : any {
        if(query.type == "string") {
            const pattern = new RegExp(query.value);
            return pattern.test(value);
        }

        if(query.type == "date") {
            const from = new Date(<string>query.from);
            const to = (query.to == null) ? new Date() : new Date(<string>query.to);
            const q = new Date(value);

            return ( from.getTime() < q.getTime() && q.getTime() < to.getTime());
        }

    }
}