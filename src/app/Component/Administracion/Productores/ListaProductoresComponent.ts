import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";

import {ProductoresService} from "../../../Service/Administracion/ProductoresService";
import {ProductorModel} from "../../../Model/Administracion/ProductorModel";

@Component({
    selector : 'ingresar-productores',
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
                        <th>Tipo Id.</th>
                        <th>Identificacicon</th>
                        <th>Correro Contacto</th>
                        <th>Ingreso</th>
                        <th></th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="#productor of productores" [routerLink]="['VerProductor', { id : productor.id }]" class="router">
                        <td>{{ productor.nombre }}</td>
                        <td>{{ productor.numeroTelefono }}</td>
                        <td>{{ tiposIdentificaciones[productor.tipoIdentificacion] }}</td>
                        <td>{{ productor.identificacion}} </td>
                        <td>{{ productor.correoContacto }}</td>
                        <td>{{ productor.getFechaIngreso() }}</td>
                        <td><i class="fa fa-pencil"></i></td>
                        <td><i class="fa fa-trash"></i></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `
})
export class ListaProductoresComponent {
    productores : Array<ProductorModel>;
    tiposIdentificaciones : Array<string>;

    constructor(public _productoresService : ProductoresService) {
        this.productores = this._productoresService.getProductores();
        this.tiposIdentificaciones = this._productoresService.getTiposIdentificacion();
    }
}