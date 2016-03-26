import {Component} from "angular2/core";
import {Router, ROUTER_DIRECTIVES, RouteParams} from "angular2/router";

import {PlantacionModel} from "../../../Model/Administracion/PlantacionModel";
import {AdministracionService} from "../../../Service/AdministracionService";
import {EmpresaModel} from "../../../Model/Administracion/EmpresaModel";

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
                            <dt>Raz&oacute;n Social</dt><dd>{{ productor?.razon_social }}</dd>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>Numero Tel&eacute;fono</dt><dd>{{ productor?.telefono }}</dd>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>{{ productor?.tipo_indentificacion?.nombre }}</dt><dd>{{ productor?.identificacion }}</dd>
                        </dl>
                        <dl class="col-xs-6 col-sm-12 col-md-6">
                            <dt>Correo Contacto</dt><dd>{{ productor?.correo }}</dd>
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
                                <th class="hidden-xs">Producto</th>
                                <th class="hidden-xs hidden-sm">Tipo</th>
                                <th>Tama&ntilde;o</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr *ngFor="#plantacion of productor?.plantaciones" class="router" [routerLink]="['../../Plantaciones/VerPlantacion' , {id : plantacion?.id}]">
                                <td>{{ plantacion?.nombre }}</td>
                                <td class="hidden-xs">{{ plantacion?.producto?.nombre }}</td>
                                <td class="hidden-xs hidden-sm">{{ plantacion?.tipo_producto?.nombre }}</td>
                                <td>{{ plantacion?.tamano }} {{ plantacion?.unidad?.nombre }}</td>
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
