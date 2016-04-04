import {Component} from "angular2/core";
import {DatetimePipe} from "../../../Pipes/DatetimePipe";
import {InventarioService} from "../../Services/InventarioService";
import {InventarioMaterialModel} from "../../Models/InventarioMaterialModel";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {NotifyService} from "../../../Notify/Services/NotifyService";

@Component({
    selector : 'lista-existente',
    pipes : [DatetimePipe],
    directives : [ROUTER_DIRECTIVES],
    template : `<div class="container-fluid">
        <h4>Lista de Bodegas</h4>
        <div class="table-responsive">
            <table class="table table-hover">
                <thead>
                    <tr>
                        <th class="text-center">Codigo</th>
                        <th>Material</th>
                        <th>Bodega</th>
                        <th class="text-center">En Bodega</th>
                        <th class="text-center">Total</th>
                        <th class="text-center">Ultimo Movimiento</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="#inventario of inventarios" [routerLink]="['InventarioDetalle', {bodegaId : inventario.bodega.id, materialId : inventario.material.id }]" class="router">
                        <td th class="text-center">{{ inventario.material.codigo }}</td>
                        <td>{{ inventario.material.nombre }}</td>
                        <td>{{ inventario.bodega.nombre }}</td>
                        <td class="text-center">{{ inventario.cantidad }}</td>
                        <td class="text-center">{{ inventario.material.cantidad }}</td>
                        <td class="text-center">{{ inventario.fecha | datetime }}</td>
                        <td class="text-center"><i class="fa fa-ellipsis-v"></i></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`
})
export class ListaInventarioExistenteComponent {
    inventarios : InventarioMaterialModel[];

    constructor(public _inventarioService : InventarioService,
                public _notifyService : NotifyService) {}
    
    ngOnInit() {
        this._notifyService.loader(true);
        this._inventarioService.getExistente().subscribe(
            inventarios => this.inventarios = inventarios, // On Success
            (error) => this._notifyService.show(error.status + " : " +error.url),
            () => this._notifyService.loader(false)); // On Completed
    }
}