import {Component} from 'angular2/core';
import {FormBuilder,ControlGroup, Validators} from "angular2/common";
import {Router} from "angular2/router";

import {MovimientosInventarioComponent} from "../Movimientos/MovimientosInventarioComponent";
import {MotivoEgresoProductorComponent} from "./MotivosEgresos/MotivoEgresoProductorComponent";
import {MotivoEgresoTransferenciaComponent} from "./MotivosEgresos/MotivoEgresoTransferenciaComponent";
import {MotivoEgresoProveedorComponent} from "./MotivosEgresos/MotivoEgresoProveedorComponent";

import {MovimientoInventarioModel} from "../../../Model/Inventario/MovimientoInventarioModel";
import {MovimientosInventarioService} from "../../../Service/Inventario/MovimientosInventarioService";


@Component({
    selector: 'egresar-inventario',
    directives: [MovimientosInventarioComponent, MotivoEgresoProductorComponent,MotivoEgresoTransferenciaComponent, MotivoEgresoProveedorComponent],
    template: `<div class="container-fluid">
        <h4>Egreso de Material</h4>
        <form class="form-horizontal" (ngSubmit)="submit()" autocomplete="off" spellcheck="false">
            <movimiento-inventario (valuesChange)="submitChanges($event, 'movimiento')" (cambioMotivoMovimiento)="activarFormulario($event)" [tipoMovimiento]="movimiento" [opcionesTiposMovimiento]="opciones"></movimiento-inventario>
            <div class="form-group">
                <div class="col-sm-10 col-md-8"><hr /></div>
            </div>
            <motivo-egreso-productor (valuesChange)="submitChanges($event, 'productor')" [hidden]="formularioActivo !== 'productor'"></motivo-egreso-productor>
            <motivo-egreso-transferencia (valuesChange)="submitChanges($event, 'transferencia')" [hidden]="formularioActivo !== 'transferencia'"></motivo-egreso-transferencia>
            <motivo-egreso-proveedor (valuesChange)="submitChanges($event, 'proveedor')" [hidden]="formularioActivo !== 'proveedor'"></motivo-egreso-proveedor>
            <div class="form-group">
                <div class="col-sm-7 col-md-5 col-sm-push-3">
                    <input type="submit" class="btn btn-primary" value="Generar Ingreso" [disabled]="!readyToSubmit()"/>
                </div>
            </div>
        </form>
    </div>`
})
export class EgresarInventarioComponent {
    movimiento = false; //Ingreso Inventario
    formularios : Array<ControlGroup>;
    formularioActivo : string;
    opciones : Array<string>; //Opciones de Tipos de Movimiento para MovimientoInventarioComponent

    constructor(public _router : Router, public _movimientosInventarioService : MovimientosInventarioService) {
        this.opciones = ["Devolver a Proveedor", "Transferencia a Bodega", "Envio a Productor"];
        this.formularios = [];

    }

    activarFormulario(motivo : number) : void {
        if( motivo == 0) this.formularioActivo = "proveedor";
        if( motivo == 1) this.formularioActivo = "transferencia";
        if( motivo == 2) this.formularioActivo = "productor";
    }

    submitChanges(form : ControlGroup, tipo : string) {
        this.formularios[tipo] = form;
    }

    readyToSubmit() : boolean {
        var mainFormValid = false, subFormValid = false;
        if(typeof this.formularios["movimiento"] !== "undefined") {
            mainFormValid = this.formularios["movimiento"].valid;

            if( typeof this.formularios[this.formularioActivo] !== "undefined") {
                subFormValid = this.formularios[this.formularioActivo].valid;
            }
        }

        return mainFormValid && subFormValid;
    }

    submit() {
        if(this.readyToSubmit()) {
            var mv = this.formularios["movimiento"].value;
            var movimiento = new MovimientoInventarioModel(null, mv.bodega, mv.tipoMovimiento, mv.material, mv.cantidad, mv.motivoMovimiento)
            this._movimientosInventarioService.push(movimiento);

            console.log(this.formularios[this.formularioActivo]);
        }
    }
}