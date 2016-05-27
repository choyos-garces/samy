import {Component} from "angular2/core";
import {FormController} from "../../../App/FormController";
import {InventarioService} from "../../Services/InventarioService";
import {OpcionesService} from "../../../App/Services/OpcionesService";
import {AdministracionService} from "../../../Administracion/Services/AdministracionService";
import {FormBuilder} from "angular2/common";
import {Router, RouteParams} from "angular2/router";
import {NotifyService} from "../../../Notify/Services/NotifyService";
import {FromularioMovimientoInventarioComponent} from "./FromularioMovimientoInventarioComponent";
import {MovimientoInventarioModel} from "../../Models/MovimientoInventarioModel";

@Component({
    selector: 'editar-movimiento',
    directives: [FromularioMovimientoInventarioComponent],
    template:
`<div class="container-fluid">
    <h4>Editar Movimiento de Inventario</h4>
    <form class="form-horizontal">
        <fieldset [disabled]="isFormDisabled()">
        <formulario-movimiento [movimiento]="movimiento"></formulario-movimiento>
        </fieldset>
    </form>
</div>`
})
export class EditarMovimientoInventarioComponent extends FormController{
    movimiento : MovimientoInventarioModel = null;

    constructor(public _router : Router,
                public _formBuilder : FormBuilder,
                public _administracionService : AdministracionService,
                public _opcionesService : OpcionesService,
                public _inventarioService : InventarioService,
                public _params : RouteParams,
                _notifyService : NotifyService) { super(_notifyService) }

    ngOnInit() {
        const id = parseInt(this._params.get('id'));
        this.subscribeResource('movimiento', this._inventarioService.getMovimiento(id))
    }
}