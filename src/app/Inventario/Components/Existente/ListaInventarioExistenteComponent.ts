import {Component} from "angular2/core";
import {DatetimePipe} from "../../../Pipes/DatetimePipe";
import {InventarioService} from "../../Services/InventarioService";
import {InventarioMaterialModel} from "../../Models/InventarioMaterialModel";
import {ROUTER_DIRECTIVES} from "angular2/router";
import {NotifyService} from "../../../Notify/Services/NotifyService";
import {BusquedaInventarioExistente} from "./BusquedaInventarioExistente";
import {FilterByQueryPipe} from "../../../Pipes/FilterByQueryPipe";
import {FormController} from "../../../ControlPanel/FormController";
import {OpcionesService} from "../../../ControlPanel/Services/OpcionesService";
import {AdministracionService} from "../../../Administracion/Services/AdministracionService";
import {BodegaModel} from "../../../Administracion/Models/BodegaModel";
import {SimpleKey} from "../../../ControlPanel/Models/SimpleKey";

@Component({
    selector : 'lista-existente',
    pipes : [DatetimePipe, FilterByQueryPipe],
    directives : [ROUTER_DIRECTIVES, BusquedaInventarioExistente],
    template : `
<div class="container-fluid">
    <busqueda-inventario-existente (query)="setFiltros($event)" [bodegas]="bodegas" [tiposMaterial]="tiposMaterial"></busqueda-inventario-existente>
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
                <tr *ngFor="#inventario of inventarios | filterByQuery : filtros" [routerLink]="['InventarioDetalle', {bodegaId : inventario.bodega.id, materialId : inventario.material.id }]" class="router">
                    <td th class="text-center">{{ inventario.material.codigo }}</td>
                    <td><a [routerLink]="['/Administracion/Materiales/VerMaterial', { id : inventario.material.id }]">{{ inventario.material.nombre }}</a></td>
                    <td><a [routerLink]="['/Administracion/Bodegas/VerBodega', { id : inventario.bodega.id }]">{{ inventario.bodega.nombre }}</a></td>
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
export class ListaInventarioExistenteComponent extends FormController {
    inventarios : InventarioMaterialModel[];
    tiposMaterial : SimpleKey[];
    bodegas : BodegaModel[];
    filtros : any;
    
    constructor(public _inventarioService : InventarioService,
                public _administracionService : AdministracionService,
                public _opcionesService : OpcionesService,
                _notifyService : NotifyService) { super(_notifyService) }
    
    ngOnInit() {
        this._notifyService.loader(true);
        this.subscribeResource("tiposMaterial", this._opcionesService.getTiposMaterial());
        this.subscribeResource("bodegas", this._administracionService.getBodegas());
        this.subscribeResource("inventarios", this._inventarioService.getExistente());
    }

    setFiltros(values) {
        this.filtros = values;
    }
}