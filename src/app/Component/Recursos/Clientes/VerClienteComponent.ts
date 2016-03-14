import {Component} from "angular2/core";
import {ClienteService} from "../../../Service/Recursos/ClientesService";
import {ClienteModel} from "../../../Model/Recursos/ClienteModel";
import {RouteParams} from "angular2/router";
import {Router} from "angular2/router";

@Component({
    selector : 'ver-cliente',
    template : `
    <div class="container-fluid">
        <h3>{{ cliente.nombre }} <small>{{ cliente.razon }}</small></h3>
        <dl class="dl-horizontal">
            <dt>Numero Tel&eacute;fono</dt>
            <dd>{{ cliente.telefono }}</dd>
            <dt>Numero Cedulo o R.U.C.</dt>
            <dd>{{ cliente.ruc }}</dd>
            <dt>Correo de Contacto</dt>
            <dd>{{ cliente.correoPersonal }}</dd>
            <dt>Correo para Notificaciones</dt>
            <dd>{{ cliente.correoNotificaciones }}</dd>
        </dl>
    </div>
    `
})
export class VerClienteComponent {
    id : number;
    cliente : ClienteModel;

    constructor(public _clientesService : ClienteService, public _router : Router, public _routerParams : RouteParams) {
        this.id = parseInt(this._routerParams.get('id'));
        this.cliente = this._clientesService.getCliente(this.id);

        if(typeof this.cliente == "undefined") this._router.navigate(['ListaClientes'])

    }
}