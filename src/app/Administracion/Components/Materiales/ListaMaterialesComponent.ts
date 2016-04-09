import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from 'angular2/router'
import {MaterialModel} from "../../Models/MaterialModel";
import {AdministracionService} from "../../Services/AdministracionService";
import {DatetimePipe} from "../../../Pipes/DatetimePipe";
import {NotifyService} from "../../../Notify/Services/NotifyService";
import {Controller} from "../../../App/Controller";

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
                        <th class="text-center">Codigo</th>
                        <th>Nombre</th>
                        <th class="hidden-xs">Tipo Material</th>
                        <th class="text-center">Creado</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="#material of materiales" [routerLink]="['VerMaterial', { id : material.id }]" class="router">
                        <td class="text-center">{{ material.codigo }}</td>
                        <td>{{ material.nombre }}</td>
                        <td class="hidden-xs">{{ material.tipoMaterial.nombre }}</td>
                        <td>{{ material.fecha | datetime : "short"}}</td>
                        <td class="text-center"><i class="fa fa-ellipsis-v"></i></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`
})
export class ListaMaterialesComponent extends Controller {
    materiales : Array<MaterialModel>;

    constructor(public _administracionService : AdministracionService,
                _notifyService : NotifyService) { super(_notifyService) }

    ngOnInit() {
        this._notifyService.loader(true);
        this.subscribeResource("materiales", this._administracionService.getMateriales())
    }
}