import {Component} from 'angular2/core';
import {Router, ROUTER_DIRECTIVES} from 'angular2/router'
import {MaterialesService} from "../../../Service/Recursos/MaterialesService";
import {MaterialModel} from "../../../Model/Recursos/MaterialModel";

@Component({
    selector  : 'lista-materiales',
    directives : [ROUTER_DIRECTIVES],
    template : `<div class="container-fluid">
        <h4>Lista de Materiales</h4>
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Codigo</th>
                        <th>Nombre</th>
                        <th>Tipo Material</th>
                        <th>Ingreso</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="#material of materiales" [routerLink]="['VerMaterial', { id : material.id }]" class="router">
                        <td>{{ material.codigo }}</td>
                        <td>{{ material.nombre }}</td>
                        <td>{{ tiposMaterial[material.tipo] }}</td>
                        <td>{{ material.getFechaIngreso() }}</td>
                        <td><i class="fa fa-pencil"></i></td>
                        <td><i class="fa fa-trash"></i></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`
})
export class ListaMaterialesComponent {
    materiales : Array<MaterialModel>;
    tiposMaterial : Array<string>;

    constructor(public _materialesService : MaterialesService, public _router : Router) {
        this.materiales = this._materialesService.getMateriales();
        this.tiposMaterial = this._materialesService.getTiposMaterial();
    }
}