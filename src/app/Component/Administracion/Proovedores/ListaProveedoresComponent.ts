import {Component} from "angular2/core"
import {ROUTER_DIRECTIVES} from "angular2/router";
import {ProveedoresService} from "../../../Service/Administracion/ProveedoresService";
import {Router} from "angular2/router";
import {ProveedorModel} from "../../../Model/Administracion/ProveedorModel";

@Component({
    selector: 'lista-proveedores',
    directives : [ROUTER_DIRECTIVES],
    template : `<div class="container-fluid">
    <h4>Lista de Proveedores</h4>
    <div class="table-responsive">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Raz&oacute;n Social</th>
                    <th>Identificaci&oacute;n</th>
                    <th>Tel&eacute;fono</th>
                    <th>Correo</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr class="router" *ngFor="#proveedor of proveedores" [routerLink]="['VerProveedor', { id : proveedor.id}]">
                    <td>{{ proveedor.id }}</td>
                    <td>{{ proveedor.razonSocial }}</td>
                    <td>{{ proveedor.identificacion }}</td>
                    <td>{{ proveedor.numeroTelefono }}</td>
                    <td>{{ proveedor.correo }}</td>
                    <td><i class="fa fa-pencil"></i></td>
                    <td><i class="fa fa-trash-o"></i></td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>`
})
export class ListaProveedoresComponent {
    proveedores : Array<ProveedorModel>;

    constructor(public _proveedoresService : ProveedoresService) {
        this.proveedores = this._proveedoresService.getProveedores();
    }
}