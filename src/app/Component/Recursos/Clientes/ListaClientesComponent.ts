import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";

import {ClienteService} from "../../../Service/Recursos/ClientesService";
import {ClienteModel} from "../../../Model/Recursos/ClienteModel";

@Component({
    selector : 'ingresar-clientes',
    directives: [ROUTER_DIRECTIVES],
    template : `
    <div class="container-fluid">
        <h4>Lista de Clientes</h4>
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
                    <tr *ngFor="#cliente of clientes" [routerLink]="['VerCliente', { id : cliente.id }]" class="router">
                        <td>{{ cliente.nombre }}</td>
                        <td>{{ cliente.numeroTelefono }}</td>
                        <td>{{ tiposIdentificaciones[cliente.tipoIdentificacion] }}</td>
                        <td>{{ cliente.identificacion}} </td>
                        <td>{{ cliente.correoContacto }}</td>
                        <td>{{ cliente.getFechaIngreso() }}</td>
                        <td><i class="fa fa-pencil"></i></td>
                        <td><i class="fa fa-trash"></i></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    `
})
export class ListaClientesComponent {
    clientes : Array<ClienteModel>;
    tiposIdentificaciones : Array<string>;

    constructor(public _clientesService : ClienteService) {
        this.clientes = this._clientesService.getClientes();
        console.log(this.clientes);
        this.tiposIdentificaciones = this._clientesService.getTiposIdentificaciones();
    }
}