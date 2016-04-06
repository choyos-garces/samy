import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";

import {MovimientoInventarioModel} from "../../Models/MovimientoInventarioModel";
import {InventarioService} from "../../Services/InventarioService";
import {DatetimePipe} from "../../../Pipes/DatetimePipe";
import {NotifyService} from "../../../Notify/Services/NotifyService";

@Component({
    selector: 'lista-movimientos',
    pipes: [DatetimePipe],
    directives: [ROUTER_DIRECTIVES],
    template: `<div class="container-fluid">
    <div class="table-responsive">
        <table class="table table-hover">
            <thead>
                <tr>
                    <th>Fecha</th>
                    <th class="text-center">Origen</th>
                    <th>Motivo</th>
                    <th class="text-center">Bodega</th>
                    <th class="text-center">Materiales</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr *ngFor="#movimiento of movimientos" [routerLink]="['/Inventario/MovimientosInventario/VerMovimientoInventario', { id : movimiento.id }]" class="router">
                    <td>{{ movimiento.fecha | datetime}}</td>
                    <td class="text-center">{{ (movimiento.tipoMovimiento == 1) ? "Ingreso" : "Egreso" }}</td>
                    <td>{{ movimiento.motivoMovimiento.nombre }}</td>
                    <td class="text-center"><a [routerLink]="['/Administracion/Bodegas/VerBodega', { id : movimiento.bodega.id }]">{{ movimiento.bodega.nombre }}</a></td>
                    <td class="text-center">{{ movimiento.movimientosMateriales.length }}</td>
                    <td class="text-center"><i class="fa fa-ellipsis-v"></i></td>
                </tr>
            </tbody>
        </table>
    </div>
    </div>`
})
export class ListaMovimientosInventarioComponent {
    movimientos : MovimientoInventarioModel[];

    constructor(public _inventarioService : InventarioService,
                public _notifyService : NotifyService) {}
    
    ngOnInit() {
        this._notifyService.loader(true);
        this._inventarioService.getMovimientos()
            .subscribe(
                movimientos => {
                    this.movimientos = movimientos;
                    this._notifyService.loader(false);
                },
                error => {
                    this._notifyService.error("Error en la comunicaci&oacute;n con el Servidor");
                    this._notifyService.loader(false);
                }
            );
    }
}