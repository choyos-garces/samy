import {Component} from "angular2/core"
import {ROUTER_DIRECTIVES} from "angular2/router";
import {EmpresaModel} from "../../Models/EmpresaModel";
import {AdministracionService} from "../../Services/AdministracionService";

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
                </tr>
            </thead>
            <tbody>
                <tr class="router" *ngFor="#proveedor of proveedores" [routerLink]="['VerProveedor', { id : proveedor.id}]">
                    <td>{{ proveedor.id }}</td>
                    <td>{{ proveedor.razonSocial }}</td>
                    <td>{{ proveedor.identificacion }}</td>
                    <td>{{ proveedor.telefono }}</td>
                    <td>{{ proveedor.correo }}</td>
                    <td><i class="fa fa-pencil"></i></td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>`
})
export class ListaProveedoresComponent {
    proveedores : EmpresaModel[] = [];

    constructor(public _administracionService : AdministracionService) {}

    ngOnInit() {
        this._administracionService.getEmpresas(1).subscribe(empresas => this.proveedores = empresas);
    }
}