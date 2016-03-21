import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';
import {BodegasService} from "../../../Service/Administracion/BodegasService";
import {BodegaModel} from "../../../Model/Administracion/BodegaModel";

@Component({
    selector  : 'lista-bodegas',
    directives: [ROUTER_DIRECTIVES],
    template : `<div class="container-fluid">
        <h4>Lista de Bodegas</h4>
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Codigo</th>
                        <th>Ingreso</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="#bodega of bodegas" [routerLink]="['VerBodega', { id : bodega.id }]" class="router">
                        <td>{{ bodega.nombre }}</td>
                        <td>{{ bodega.codigo }}</td>
                        <td>{{ bodega.fecha | date }}</td>
                        <td><i class="fa fa-pencil"></i></td>
                        <td><i class="fa fa-trash"></i></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`
})
export class ListaBodegasComponent {
    bodegas : Array<BodegaModel>;

    constructor(public _bodegasService : BodegasService) {
        this.bodegas  = this._bodegasService.bodegas;
    }
}