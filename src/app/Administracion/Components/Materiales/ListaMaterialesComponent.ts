import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router'
import {MaterialModel} from "../../Models/MaterialModel";
import {AdministracionService} from "../../Services/AdministracionService";
import {DatetimePipe} from "../../../Pipes/DatetimePipe";
import {NotifyService} from "../../../Notify/Services/NotifyService";

@Component({
    selector  : 'lista-materiales',
    pipes : [DatetimePipe],
    directives : [ROUTER_DIRECTIVES],
    template : `<div class="container-fluid">
        <h4>Lista de Materiales</h4>
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th class="hidden-xs">Tipo Material</th>
                        <th>Creado</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="#material of materiales" [routerLink]="['VerMaterial', { id : material.id }]" class="router">
                        <td>{{ material.codigo }}</td>
                        <td>{{ material.nombre }}</td>
                        <td class="hidden-xs">{{ material.tipoMaterial.nombre }}</td>
                        <td>{{ material.fecha | datetime : "short"}}</td>
                        <td><i class="fa fa-pencil"></i></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`
})
export class ListaMaterialesComponent {
    materiales : Array<MaterialModel>;

    constructor(public _administracionService : AdministracionService, public _notifyService : NotifyService) {
        this._administracionService.getMateriales().subscribe(response => {
            this.materiales = response;
        });
    }
}