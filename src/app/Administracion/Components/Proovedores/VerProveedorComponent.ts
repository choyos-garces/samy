import {Component} from "angular2/core"
import {Router, ROUTER_DIRECTIVES, RouteParams} from "angular2/router";
import {EmpresaModel} from "../../Models/EmpresaModel";
import {AdministracionService} from "../../Services/AdministracionService";

@Component({
    selector: 'ver-proveedor',
    directives : [ROUTER_DIRECTIVES],
    template : `<div class="container-fluid">
    <h4>Poveedor <small>id#{{ proveedor?.id }}</small></h4>
        <div class="row">
            <div class="col-sm-6">
                <div class="panel panel-default">
                    <div class="panel-heading">Datos de Proveedor</div>
                    <div class="panel-body">
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>Codigo</dt><dd>{{ proveedor?.id }}</dd>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>Raz&oacute;n Social</dt><dd>{{ proveedor?.razon_social }}</dd>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>Numero Tel&eacute;fono</dt><dd>{{ proveedor?.telefono }}</dd>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>{{ proveedor?.tipo_identificacion?.nombre }}</dt><dd>{{ proveedor?.identificacion }}</dd>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>Corre</dt><dd>{{ proveedor?.correo }}</dd>
                        </dl>
                    </div>
                </div>
            </div>
        </div>
    </div>`
})
export class VerProveedorComponent {
    proveedor : EmpresaModel;

    constructor(public _router : Router,
                public _routeParams : RouteParams,
                public _administracionService : AdministracionService) {}

    ngOnInit() {
        const id = parseInt(this._routeParams.get("id"));
        this._administracionService.getEmpresa(id).subscribe(empresa => {
            this.proveedor = empresa;
            if(empresa == null) {
                this._router.navigate(["/Error404"]);
            }
        })
    }
}