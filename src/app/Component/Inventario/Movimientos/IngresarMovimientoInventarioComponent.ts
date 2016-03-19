import {Component} from 'angular2/core';
import {ControlGroup} from "angular2/common";
import {Router} from "angular2/router";

import {MovimientoInventarioModel} from "../../../Model/Inventario/MovimientoInventarioModel"
import {MotivoMovimientoModel} from "../../../Model/Inventario/MotivoMovimientoModel";

import {MovimientosInventarioService} from "../../../Service/Inventario/MovimientosInventarioService";

import {MovimientoInventarioComponent} from "../Movimientos/MovimientoInventarioComponent";
import {MotivoIngresoTransferenciaComponent} from "./MotivosIngreso/MotivoIngresoTransferenciaComponent";
import {MotivoIngresoDevolucionComponent} from "./MotivosIngreso/MotivoIngresoDevolucionComponent";
import {MotivoIngresoProveedorComponent} from "./MotivosIngreso/MotivoIngresoProveedorComponent";
import {MotivoEgresoProductorComponent} from "./MotivosEgresos/MotivoEgresoProductorComponent";
import {MotivoEgresoProveedorComponent} from "./MotivosEgresos/MotivoEgresoProveedorComponent";
import {MotivoEgresoTransferenciaComponent} from "./MotivosEgresos/MotivoEgresoTransferenciaComponent";
import {InventarioIngresoProductorModel} from "../../../Model/Inventario/Ingresos/InventarioIngresoProductorModel";
import {stringify} from "angular2/src/upgrade/util";
import {InventarioIngresoBodegaModel} from "../../../Model/Inventario/Ingresos/InventarioIngresoBodegaModel";
import {InventarioIngresoProveedorModel} from "../../../Model/Inventario/Ingresos/InventarioIngresoProveedorModel";

@Component({
    selector: 'ingresar-inventario',
    directives: [MovimientoInventarioComponent, MotivoIngresoTransferenciaComponent, MotivoIngresoDevolucionComponent, MotivoIngresoProveedorComponent, MotivoEgresoProductorComponent,MotivoEgresoTransferenciaComponent, MotivoEgresoProveedorComponent],
    template: `<div class="container-fluid">
        <h4>Movimientos de Inventario</h4>
        <form class="form-horizontal" autocomplete="off" spellcheck="false">
            <movimiento-inventario (valuesChange)="submitChanges($event, 0)" (cambioMotivoMovimiento)="activarFormulario($event)"></movimiento-inventario>
            <div class="form-group">
                <div class="col-sm-10 col-md-8"><hr /></div>
            </div>
            <motivo-ingreso-proveedor (valuesChange)="submitChanges($event,1)" [hidden]="formularioActivo != 1"></motivo-ingreso-proveedor>
            <motivo-ingreso-transferencia (valuesChange)="submitChanges($event, 2)" [hidden]="formularioActivo != 2"></motivo-ingreso-transferencia>
            <motivo-ingreso-devolucion (valuesChange)="submitChanges($event, 3)" [hidden]="formularioActivo != 3"></motivo-ingreso-devolucion>
            <motivo-egreso-productor (valuesChange)="submitChanges($event, 4)" [hidden]="formularioActivo != 4"></motivo-egreso-productor>
            <motivo-egreso-transferencia (valuesChange)="submitChanges($event, 5)" [hidden]="formularioActivo != 5"></motivo-egreso-transferencia>
            <motivo-egreso-proveedor (valuesChange)="submitChanges($event, 6)" [hidden]="formularioActivo != 6"></motivo-egreso-proveedor>
            <div class="form-group">
                <div class="col-sm-7 col-md-5 col-sm-push-3">
                    <button class="btn btn-primary" [disabled]="!readyToSubmit()" (click)="submit()">Generar Ingreso</button>
                </div>
            </div>
        </form>
    </div>`
})
export class IngresarMovimientoInventarioComponent {
    formularios : Array<ControlGroup> = [];
    formularioActivo : number;

    constructor(public _router : Router, public _movimientosInventarioService : MovimientosInventarioService) {}

    activarFormulario(motivoMovimiento : MotivoMovimientoModel) : void {
        this.formularioActivo = (motivoMovimiento != null) ? motivoMovimiento.id : null;
    }

    submitChanges(form : ControlGroup, tipo : string) {
        this.formularios[tipo] = form;
    }

    readyToSubmit() : boolean {
        var mainFormValid = false, subFormValid = false;
        if(typeof this.formularios[0] !== "undefined") {
            mainFormValid = this.formularios[0].valid;

            if( typeof this.formularios[this.formularioActivo] !== "undefined") {
                subFormValid = this.formularios[this.formularioActivo].valid;
            }
        }

        return mainFormValid && subFormValid;
    }

    submit() {
        if(this.readyToSubmit()) {
            var formularioMovimiento = this.formularios[0].value;
            var movimientoInventario = new MovimientoInventarioModel(null, formularioMovimiento.bodega, formularioMovimiento.tipoMovimiento, formularioMovimiento.motivoMovimiento);
            movimientoInventario.movimientosMateriales = formularioMovimiento.movimientosMateriales;

            var fa = this.formularios[this.formularioActivo].value;
            var data : Object;
            if( movimientoInventario.motivoMovimiento.id == 1) data = new InventarioIngresoProveedorModel(null, movimientoInventario, fa.proveedor, fa.factura);
            if( movimientoInventario.motivoMovimiento.id == 2) data = new InventarioIngresoBodegaModel(null, movimientoInventario, fa.bodega, fa.notas);
            if( movimientoInventario.motivoMovimiento.id == 3) data = new InventarioIngresoProductorModel(null, movimientoInventario, fa.process, fa.plantacion);
            //if( movimientoInventario.motivoMovimiento.id == 4);
            //if( movimientoInventario.motivoMovimiento.id == 5);
            //if( movimientoInventario.motivoMovimiento.id == 6);

            console.log(data);

        }
    }


}