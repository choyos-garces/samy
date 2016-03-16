import {Injectable} from "angular2/core";
import {ProductorModel} from "../../Model/Recursos/ProductorModel";

@Injectable()
export class ProductoresService {
    productores : Array<ProductorModel> = [];
    private tiposIdentificaciones : Array<string>;
    
    constructor() {
        
        this.tiposIdentificaciones = [
            "Cédula",
            "R.U.C."
        ];
        
        let i : number = 1;
        this.productores.push(
            new ProductorModel({id :i++, nombre : `A ${i-1} Christopher Hoyos`, numeroTelefono : '042554433', tipoIdentificacion : 1, identificacion : '0924323843', correoContacto : 'choyos@asd.com', fechaIngreso : new Date() }, true, true),
            new ProductorModel({id :i++, nombre : `B ${i-1} Christopher Hoyos`, numeroTelefono : '042554433', tipoIdentificacion : 0, identificacion : '0924323843', correoContacto : 'choyos@asd.com', fechaIngreso : new Date() }, true, true),
            new ProductorModel({id :i++, nombre : `C ${i-1} Christopher Hoyos`, numeroTelefono : '042554433', tipoIdentificacion : 1, identificacion : '0924323843', correoContacto : 'choyos@asd.com', fechaIngreso : new Date() }, true, true),
            new ProductorModel({id :i++, nombre : `D ${i-1} Christopher Hoyos`, numeroTelefono : '042554433', tipoIdentificacion : 0, identificacion : '0924323843', correoContacto : 'choyos@asd.com', fechaIngreso : new Date() }, true, true),
            new ProductorModel({id :i++, nombre : `E ${i-1} Christopher Hoyos`, numeroTelefono : '042554433', tipoIdentificacion : 1, identificacion : '0924323843', correoContacto : 'choyos@asd.com', fechaIngreso : new Date() }, true, true),
            new ProductorModel({id :i++, nombre : `F ${i-1} Christopher Hoyos`, numeroTelefono : '042554433', tipoIdentificacion : 0, identificacion : '0924323843', correoContacto : 'choyos@asd.com', fechaIngreso : new Date() }, true, true),
            new ProductorModel({id :i++, nombre : `G ${i-1} Christopher Hoyos`, numeroTelefono : '042554433', tipoIdentificacion : 1, identificacion : '0924323843', correoContacto : 'choyos@asd.com', fechaIngreso : new Date() }, true, true),
            new ProductorModel({id :i++, nombre : `H ${i-1} Christopher Hoyos`, numeroTelefono : '042554433', tipoIdentificacion : 0, identificacion : '0924323843', correoContacto : 'choyos@asd.com', fechaIngreso : new Date() }, true, true),
            new ProductorModel({id :i++, nombre : `I ${i-1} Christopher Hoyos`, numeroTelefono : '042554433', tipoIdentificacion : 1, identificacion : '0924323843', correoContacto : 'choyos@asd.com', fechaIngreso : new Date() }, true, true),
            new ProductorModel({id :i++, nombre : `J ${i-1} Christopher Hoyos`, numeroTelefono : '042554433', tipoIdentificacion : 0, identificacion : '0924323843', correoContacto : 'choyos@asd.com', fechaIngreso : new Date() }, true, true)
        );
    }

    getTipoIdentificacion(index : number) : string {
        return this.tiposIdentificaciones[index];
    }

    push(productor : ProductorModel) : ProductorModel {
        productor.id = this.productores[this.productores.length - 1].id + 1;
        this.productores.push(productor);

        return productor;
    }
    getProductores():Array<ProductorModel> {
        return this.productores;
    }

    getById(id : number ) : ProductorModel {
        this.getProductores();
        let resultado = this.productores.filter((cliente : ProductorModel) => {
            return cliente.id == id;
        });

        return (resultado.length == 1) ? resultado[0] : null;
    }

    getTiposIdentificaciones():Array<string> {
        return this.tiposIdentificaciones;
    }
}