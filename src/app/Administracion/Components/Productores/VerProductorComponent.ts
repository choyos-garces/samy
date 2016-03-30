import {Component} from "angular2/core";
import {Router, ROUTER_DIRECTIVES, RouteParams} from "angular2/router";

import {PlantacionModel} from "../../Models/PlantacionModel";
import {AdministracionService} from "../../Services/AdministracionService";
import {EmpresaModel} from "../../Models/EmpresaModel";

@Component({
    selector : 'ver-productor',
    directives : [ROUTER_DIRECTIVES],
    template : `<div class="container-fluid">
        <h4>Productor <small>id#{{ productor?.id }}</small></h4>
        <div class="row">
            <div class="col-sm-6">
                <div class="panel panel-default">
                    <div class="panel-heading">Datos de Productor</div>
                    <div class="panel-body">
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>Codigo</dt><dd>{{ productor?.id }}</dd>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>Raz&oacute;n Social</dt><dd>{{ productor?.razonSocial }}</dd>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>Tel&eacute;fono</dt><dd>{{ productor?.telefono }}</dd>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>{{ productor?.tipoIdentificacion?.nombre }}</dt><dd>{{ productor?.identificacion }}</dd>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>Correo</dt><dd>{{ productor?.correo }}</dd>
                        </dl>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        Plantaciones
                        <a class="pull-right" [routerLink]="['../../Plantaciones/IngresarPlantacion' , {productor : productor?.id}]"><i class="fa fa-plus fa-fw"></i> Anadir</a>
                    </div>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Producto</th>
                                <th class="hidden-sm">Tipo</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr *ngFor="#plantacion of productor?.plantaciones" class="router" [routerLink]="['../../Plantaciones/VerPlantacion' , {id : plantacion?.id}]">
                                <td>{{ plantacion?.nombre }}</td>
                                <td>{{ plantacion?.producto?.nombre }}</td>
                                <td class="hidden-sm">{{ plantacion?.tipoProducto?.nombre }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>`
})
export class VerProductorComponent {
    productor : EmpresaModel;
    tiposIdentificacion : Array<string>;
    plantaciones : Array<PlantacionModel>;

    constructor(public _router : Router,
                public _routerParams : RouteParams,
                public _administracionService : AdministracionService) {}

    ngOnInit() {
        const id = parseInt(this._routerParams.get('id'));
        this._administracionService.getEmpresa(id).subscribe(empresa => {
            if(empresa == null) this._router.navigate(['/Error404']);
            this.productor = empresa;
        });

    }
}
