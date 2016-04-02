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
                        <td>Material</td>
                        <td>Bodega</td>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="#inventario of inventarios" class="router">
                        <td>{{ inventario.material.nombre }}</td>
                        <td>{{ inventario.bodega.nombre }}</td>
                        <td><i class="fa fa-eye"></i></td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`
})
export class ListaInventarioExistente {
    inventarios : InventarioMaterialModel[];

    constructor(public _inventarioService : InventarioService) {
        this._inventarioService.getExistente().subscribe(inventarios => this.inventarios = inventarios);
    }
}