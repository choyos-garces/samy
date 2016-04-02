import {Component} from "angular2/core";
import {DatetimePipe} from "../../../Pipes/DatetimePipe";
import {InventarioService} from "../../Services/InventarioService";
import {InventarioMaterialModel} from "../../Models/InventarioMaterialModel";

@Component({
    selector : 'lista-existente',
    pipes : [DatetimePipe],
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
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="#inventario of inventarios" class="router">
                        <td th class="text-center">{{ inventario.material.codigo }}</td>
                        <td>{{ inventario.material.nombre }}</td>
                        <td>{{ inventario.bodega.nombre }}</td>
                        <td class="text-center">{{ inventario.cantidad }}</td>
                        <td class="text-center">{{ inventario.material.cantidad }}</td>
                        <td class="text-center">{{ inventario.fecha | datetime }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`
})
export class ListaInventarioExistenteComponent {
    inventarios : InventarioMaterialModel[];

    constructor(public _inventarioService : InventarioService) {}
    
    ngOnInit() {
        this._inventarioService.getExistente().subscribe(inventarios => this.inventarios = inventarios);
    }
}