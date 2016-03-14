import {Injectable} from "angular2/core";
import {ClienteModel} from "../../Model/Recursos/ClienteModel";

@Injectable()
export class ClienteService {
    clientes : Array<ClienteModel> = [];
    private tiposIdentificaciones : Array<string>;
    
    constructor() {
        
        this.tiposIdentificaciones = [
            "Cédula",
            "R.U.C."
        ];
        
        let i : number = 1;
        this.clientes.push(
            new ClienteModel({id :i++, nombre : `A ${i-1} Christopher Hoyos`, numeroTelefono : '042554433', tipoIdentificacion : 1, identificacion : '0924323843', correoContacto : 'choyos@asd.com', fechaIngreso : new Date() }, true, true),
            new ClienteModel({id :i++, nombre : `B ${i-1} Christopher Hoyos`, numeroTelefono : '042554433', tipoIdentificacion : 0, identificacion : '0924323843', correoContacto : 'choyos@asd.com', fechaIngreso : new Date() }, true, true),
            new ClienteModel({id :i++, nombre : `C ${i-1} Christopher Hoyos`, numeroTelefono : '042554433', tipoIdentificacion : 1, identificacion : '0924323843', correoContacto : 'choyos@asd.com', fechaIngreso : new Date() }, true, true),
            new ClienteModel({id :i++, nombre : `D ${i-1} Christopher Hoyos`, numeroTelefono : '042554433', tipoIdentificacion : 0, identificacion : '0924323843', correoContacto : 'choyos@asd.com', fechaIngreso : new Date() }, true, true),
            new ClienteModel({id :i++, nombre : `E ${i-1} Christopher Hoyos`, numeroTelefono : '042554433', tipoIdentificacion : 1, identificacion : '0924323843', correoContacto : 'choyos@asd.com', fechaIngreso : new Date() }, true, true),
            new ClienteModel({id :i++, nombre : `F ${i-1} Christopher Hoyos`, numeroTelefono : '042554433', tipoIdentificacion : 0, identificacion : '0924323843', correoContacto : 'choyos@asd.com', fechaIngreso : new Date() }, true, true),
            new ClienteModel({id :i++, nombre : `G ${i-1} Christopher Hoyos`, numeroTelefono : '042554433', tipoIdentificacion : 1, identificacion : '0924323843', correoContacto : 'choyos@asd.com', fechaIngreso : new Date() }, true, true),
            new ClienteModel({id :i++, nombre : `H ${i-1} Christopher Hoyos`, numeroTelefono : '042554433', tipoIdentificacion : 0, identificacion : '0924323843', correoContacto : 'choyos@asd.com', fechaIngreso : new Date() }, true, true),
            new ClienteModel({id :i++, nombre : `I ${i-1} Christopher Hoyos`, numeroTelefono : '042554433', tipoIdentificacion : 1, identificacion : '0924323843', correoContacto : 'choyos@asd.com', fechaIngreso : new Date() }, true, true),
            new ClienteModel({id :i, nombre : `J ${i-1} Christopher Hoyos`, numeroTelefono : '042554433', tipoIdentificacion : 0, identificacion : '0924323843', correoContacto : 'choyos@asd.com', fechaIngreso : new Date() }, true, true)
        );
    }

    getTipoIdentificacion(index : number) : string {
        return this.tiposIdentificaciones[index];
    }

    push(cliente : ClienteModel) : ClienteModel {
        cliente.id = this.clientes[this.clientes.length - 1].id + 1;

        console.log(this.clientes[this.clientes.length - 1]);
        this.clientes.push(cliente);

        return cliente;
    }
    getClientes():Array<ClienteModel> {
        return this.clientes;
    }

    getCliente( id : number ) : ClienteModel {
        this.getClientes();
        let resultado = this.clientes.filter((cliente : ClienteModel) => {
            return cliente.id == id;
        });

        return (resultado.length == 1) ? resultado[0] : null;
    }

    getTiposIdentificaciones():Array<string> {
        return this.tiposIdentificaciones;
    }
}