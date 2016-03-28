import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router';
import {BodegaModel} from "../../Models/BodegaModel";
import {AdministracionService} from "../../Services/AdministracionService";
import {DatetimePipe} from "../../../Pipes/DatetimePipe";

@Component({
    selector  : 'lista-bodegas',
    pipes : [DatetimePipe],
    directives: [ROUTER_DIRECTIVES],
    template : `<div class="container-fluid">
        <h4>Lista de Bodegas</h4>
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Codigo</th>
                        <th>Creada</th>
                        <th class="text-center">Matriales</th>
                        <th class="text-center">Inventario</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="#bodega of bodegas" [routerLink]="['VerBodega', { id : bodega.id }]" class="router">
                        <td>{{ bodega.nombre }}</td>
                        <td>{{ bodega.codigo }}</td>
                        <td>{{ bodega.fecha | datetime : "shoty"}}</td>
                        <td class="text-center">0</td>
                        <td class="text-center">0</td>
                        <td><i class="fa fa-pencil"></i></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`
})
export class ListaBodegasComponent {
    bodegas : Array<BodegaModel>;

    constructor(public _adminstracionService : AdministracionService) {
        this._adminstracionService.getBodegas().subscribe(bodegas => this.bodegas = bodegas);
    }
}