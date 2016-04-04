import {Pipe} from "angular2/core";

@Pipe({
    name : 'filterSimpleKey'
})
export class FilterSimpleKey {
    /**
     * Filtra una Colleccion
     * 
     * arg[0] Nombre de la propiedad q tiene la SimpleKey
     * arg[1] El valor para filtrar
     * 
     * @param collection
     * @param arg
     * @returns any[]
     */
    transform(collection :  any[], arg : string []) : any[] {
        var key = arg[1];
        return (typeof collection != "undefined" && typeof arg[0] != "undefined") ? collection.filter((item : any) => {
            return item[arg[0]].id == parseInt(key);
        }) : collection;
    }
}