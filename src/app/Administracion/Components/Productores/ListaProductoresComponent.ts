import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";
import {EmpresaModel} from "../../Models/EmpresaModel";
import {AdministracionService} from "../../Services/AdministracionService";
import {DatetimePipe} from "../../../Pipes/DatetimePipe";


@Component({
    selector : 'ingresar-productores',
    pipes : [DatetimePipe],
    directives: [ROUTER_DIRECTIVES],
    template : `
    <div class="container-fluid">
        <h4>Lista de Productores</h4>
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Numero Tel.</th>
                        <th>Correro</th>
                        <th class="hidden-xs">Ingreso</th>
                        <th style="width: 1%"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="#productor of productores" [routerLink]="['VerProductor', { id : productor.id }]" class="router">
                        <td>{{ productor.razon_social }}</td>
                        <td>{{ productor.telefono }}</td>
                        <td>{{ productor.correo }}</td>
                        <td class="hidden-xs">{{ productor.fecha | datetime }}</td>
                        <td><i class="fa fa-pencil"></i></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `
})
export class ListaProductoresComponent {
    productores : EmpresaModel[];

    constructor(public _administracionService : AdministracionService) {}

    ngOnInit() {
        this._administracionService.getEmpresas(0).subscribe(productores => this.productores = productores);
    }
}