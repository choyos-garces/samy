import {Component} from "angular2/core"
import {Router, ROUTER_DIRECTIVES, RouteParams} from "angular2/router";

import {ProveedoresService} from "../../../Service/Recursos/ProveedoresService";
import {ProveedorModel} from "../../../Model/Recursos/ProveedorModel";

@Component({
    selector: 'ver-proveedor',
    directives : [ROUTER_DIRECTIVES],
    template : `<div class="container-fluid">
    <h3>{{ proveedor.razonSocial }}</h3>
    <div class="row">
        <div class="col-sm-6">
            <dl class="dl-horizontal">
                <dt>Identificaci&oacute;n</dt>
                <dd>{{ proveedor.identificacion }}</dd>
                <dt>Tel&eacute;fono</dt>
                <dd>{{ proveedor.numeroTelefono }}</dd>
            </dl>
            <dl>
                <dt>Correo</dt>
                <dd>{{ proveedor.correo }}</dd>
                <dt>Direcci&oacute;n</dt>
                <dd>{{ proveedor.direccion }}</dd>
            </dl>
        </div>
        <div class="col-sm-6">
            <div class="panel">
                <div class="panel-heading">
                    <strong>Contacto</strong>
                    <button type="button" class="action">A&ntilde;adir <i class="fa fa-plus"></i></button>
                </div>
                <div class="panel-body">
                </div>
            </div>
        </div>
    </div>
    </div>`
})
export class VerProveedorComponent {
    proveedor : ProveedorModel;

    constructor(public _router : Router,
                public _routeParams : RouteParams,
                public _proveedoresService : ProveedoresService) {

        const id = parseInt(this._routeParams.get("id"));
        this.proveedor = this._proveedoresService.getById(id);

        if(this.proveedor == null) {
            this._router.navigate(["/Error404"]);
        }
    }
}