import {Component} from "angular2/core"
import {ROUTER_DIRECTIVES} from "angular2/router";
import {EmpresaModel} from "../../Models/EmpresaModel";
import {AdministracionService} from "../../Services/AdministracionService";
import {Controller} from "../../../App/Controller";
import {NotifyService} from "../../../Notify/Services/NotifyService";

@Component({
    selector: 'lista-proveedores',
    directives : [ROUTER_DIRECTIVES],
    template : `<div class="container-fluid">
    <h4>Lista de Proveedores</h4>
    <div class="table-responsive">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th class="text-center">Id</th>
                    <th>Raz&oacute;n Social</th>
                    <th>Tel&eacute;fono</th>
                    <th>Correo</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr class="router" *ngFor="#proveedor of proveedores" [routerLink]="['VerProveedor', { id : proveedor.id}]">
                    <td class="text-center">{{ proveedor.id }}</td>
                    <td>{{ proveedor.razonSocial }}</td>
                    <td>{{ proveedor.telefono }}</td>
                    <td>{{ proveedor.correo }}</td>
                    <td><i class="fa fa-ellipsis-v"></i></td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>`
})
export class ListaProveedoresComponent extends Controller{
    proveedores : EmpresaModel[];

    constructor(public _administracionService : AdministracionService,
                _notifySerivce : NotifyService) { super(_notifySerivce) }

    ngOnInit() {
        this._notifyService.loader(true);
        this.subscribeResource("proveedores", this._administracionService.getEmpresas(1));
    }
}