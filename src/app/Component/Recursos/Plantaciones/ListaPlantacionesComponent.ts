import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router';

import {BodegasService} from "../../../Service/Recursos/BodegasService";
import {BodegaModel} from "../../../Model/Recursos/BodegaModel";
import {PlantacionModel} from "../../../Model/Recursos/PlantacionModel";
import {PlantacionesService} from "../../../Service/Recursos/PlantacionesService";

@Component({
    selector  : 'lista-plantaciones',
    directives: [ROUTER_DIRECTIVES],
    template : `<div class="container-fluid">
        <h4>Lista de Plantaciones</h4>
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Producto</th>
                        <th>Tipo</th>
                        <th>Propietario</th>
                        <th>Tamana&ntilde;o</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="#plantacion of plantaciones" [routerLink]="['VerPlantacion', { id : bodega.id }]" class="router">
                        <td>{{ plantacion.id }}</td>
                        <td>{{ plantacion.nombre }}</td>
                        <td>Tipo</td>
                        <td>Propietario</td>
                        <td>Tamana&ntilde;o</td>
                        <td><i class="fa fa-pencil"></i></td>
                        <td><i class="fa fa-trash"></i></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`
})
export class ListaPlantacionesComponent {
    plantaciones : Array<PlantacionModel>;

    constructor(public _router : Router, public _plantacionesService : PlantacionesService) {
        this.plantaciones  = this._plantacionesService.getPlantciones();
    }
}