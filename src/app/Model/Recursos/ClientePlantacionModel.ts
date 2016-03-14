interface simpleKey {
    key : number,
    label : string
}

export class ClientePlantacionModel {
    id : number;
    nombre : string;
    tipo : simpleKey;
    tamano : number;

    constructor( nombre : string, tamano : number, tipo : simpleKey = null, id : number = null) {

    }
}