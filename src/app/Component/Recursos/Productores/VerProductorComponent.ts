import {Component} from "angular2/core";
import {Router, ROUTER_DIRECTIVES} from "angular2/router";

import {ProductoresService} from "../../../Service/Recursos/ProductoresService";
import {ProductorModel} from "../../../Model/Recursos/ProductorModel";
import {RouteParams} from "angular2/router";
import {PlantacionModel} from "../../../Model/Recursos/PlantacionModel";
import {PlantacionesService} from "../../../Service/Recursos/PlantacionesService";
import {VerPlantacionComponent} from "../Plantaciones/VerPlantacionComponent";

@Component({
    selector : 'ver-productor',
    directives : [ROUTER_DIRECTIVES],
    template : `<div class="container-fluid">
        <h3>{{ productor.razon }} <small>{{ productor.nombre }}</small></h3>
        <div class="row">
            <div class="col-sm-6">
                <div class="panel">
                    <div class="panel-heading">
                        <strong>Datos de Cliente</strong>
                    </div>
                    <div class="panel-body">
                        <dl class="dl-horizontal">
                            <dt>Codigo</dt>
                            <dd>{{ productor.id }}</dd>
                            <dt>Numero Tel&eacute;fono</dt>
                            <dd>{{ productor.numeroTelefono }}</dd>
                            <dt>{{ tipoIdentificacion }}</dt>
                            <dd>{{ productor.identificacion }}</dd>
                            <dt>Correo Contacto</dt>
                            <dd>{{ productor.correoContacto }}</dd>
                            <dt>Correo Notificaciones</dt>
                            <dd>{{ productor.correoNotificaciones }}</dd>
                        </dl>
                    </div>
                </div>
            </div>
            <div class="col-sm-6">
                <div class="panel panel-default">
                    <div class="panel-heading">
                        <strong>Plantaciones</strong>
                        <button type="button" class="action">Anadir <i class="fa fa-plus"></i></button>
                    </div>
                    <table class="table table-hover">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Producto</th>
                                <th>Tipo</th>
                                <th>Tama&ntilde;o</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr *ngFor="#plantacion of plantaciones" [routerLink]="['../../Plantacion/VerPlantacion', { id : plantacion.id}]" class="router">
                                <td>{{ plantacion.nombre }}</td>
                                <td>{{ productos[plantacion.producto] }}</td>
                                <td>{{ tipos[plantacion.tipo] }}</td>
                                <td>{{ plantacion.tamano }} {{ unidades[plantacion.unidad] }}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>`
})
export class VerProductorComponent {
    id : number;
    productor : ProductorModel;
    tipoIdentificacion : string;
    plantaciones : Array<PlantacionModel>;
    tipos : Array<string>;
    productos : Array<string>;
    unidades : Array<string>;

    constructor(public _router : Router,
                public _routerParams : RouteParams,
                public _productoresService : ProductoresService,
                public _plantacionesService : PlantacionesService ){

        this.id = parseInt(this._routerParams.get('id'));
        this.productor = this._productoresService.getById(this.id);

        if(this.productor == null) {
            this._router.navigate(['/Error404', { redirect : "productor" }])
        }
        else {
            this.plantaciones = this._plantacionesService.getByPropietario(this.productor);
            this.tipos = this._plantacionesService.getTipos();
            this.productos = this._plantacionesService.getProductos();
            this.unidades = this._plantacionesService.getUnidades();

            this.tipoIdentificacion = this._productoresService.getTipoIdentificacion(this.productor.tipoIdentificacion);
        }

    }
}
