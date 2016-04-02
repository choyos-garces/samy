import {Component} from "angular2/core";
import {InventarioService} from "../../Services/InventarioService";
import {BodegaModel} from "../../../Administracion/Models/BodegaModel";
import {MaterialModel} from "../../../Administracion/Models/MaterialModel";
import {MovimientoMaterialModel} from "../../Models/MovimientoMaterialModel";

/**
 * Created by Christopher on 4/2/2016.
 */

@Component({
    selector : 'inventario-detalle',
    template : `<div class="container-fluid">
    <table class="table table-hover">
        <thead>
            <tr>
                <th>Fecha</th>
                <th class="text-center">Codigo</th>
                <th class="text-center">Total</th>
                <th class="text-center">Ultimo Movimiento</th>
            </tr>
        </thead>
        <tbody>
            <tr *ngFor="#movimiento of movimientosMateriales" class="router">
                <td>{{ movimiento.fecha | datetime : "short"}}</td>
                <th class="text-center">{{ movimiento.cantidadPrevia }}</td>
                <th class="text-center">{{ movimiento.cantidad }}</td>
            </tr>
        </tbody>
    </table>
</div>`
})
export class InventarioDetalleComponent {
    bodega : BodegaModel;
    material : MaterialModel;
    movimientosMateriales : MovimientoMaterialModel[];
    constructor(public _invetarioService : InventarioService) {}

    ngOnInit() {
        this._invetarioService.getInventarioDetall(1,1).subscribe(response => {
            this.material = response.material;
            this.bodega = response.bodega;
            this.movimientosMateriales = response.movimientosMateriales
        })
    }
}