import {Component} from 'angular2/core';
import {FormBuilder,ControlGroup, Validators} from "angular2/common";
import {Router} from "angular2/router";


import {MovimientoInventarioModel} from "../../../Model/Inventario/MovimientoInventarioModel"
import {MotivoIngresoDevolucionComponent} from "./MotivosIngreso/MotivoIngresoDevolucionComponent";
import {MotivoIngresoProveedorComponent} from "./MotivosIngreso/MotivoIngresoProveedorComponent";
import {MotivoIngresoTransferenciaComponent} from "./MotivosIngreso/MotivoIngresoTransferenciaComponent";
import {MovimientosInventarioComponent} from "../Movimientos/MovimientosInventarioComponent";
import {MovimientosInventarioService} from "../../../Service/Inventario/MovimientosInventarioService";


@Component({
    selector: 'ingresar-inventario',
    directives: [MovimientosInventarioComponent, MotivoIngresoTransferenciaComponent, MotivoIngresoDevolucionComponent, MotivoIngresoProveedorComponent],
    template: `<div class="container-fluid">
        <h4>Ingresar a Inventario</h4>
        <form class="form-horizontal" (ngSubmit)="submit()" autocomplete="off" spellcheck="false">
            <movimiento-inventario (valuesChange)="submitChanges($event, 'movimiento')" (cambioMotivoMovimiento)="activarFormulario($event)" [tipoMovimiento]="ingreso" [opcionesTiposMovimiento]="opciones"></movimiento-inventario>
            <div class="form-group">
                <div class="col-sm-10 col-md-8"><hr /></div>
            </div>
            <motivo-ingreso-proveedor (valuesChange)="submitChanges($event, 'proveedor')" [hidden]="formularioActivo !== 'proveedor'"></motivo-ingreso-proveedor>
            <motivo-ingreso-transferencia (valuesChange)="submitChanges($event, 'transferencia')" [hidden]="formularioActivo !== 'transferencia'"></motivo-ingreso-transferencia>
            <motivo-ingreso-devolucion (valuesChange)="submitChanges($event, 'devolucion')" [hidden]="formularioActivo !== 'devolucion'"></motivo-ingreso-devolucion>
            <div class="form-group">
                <div class="col-sm-7 col-md-5 col-sm-push-3">
                    <input type="submit" class="btn btn-primary" value="Generar Ingreso" [disabled]="!readyToSubmit()"/>
                </div>
            </div>
        </form>
        </div>`
})
export class IngresarInventarioComponent {
    ingreso = true; //Ingreso Inventario

    formularios : Array<ControlGroup>;
    formularioActivo : string;
    opciones : Array<string>; //Opciones de Tipos de Movimiento para MovimientoInventarioComponent

    constructor(public _router : Router, public _movimientosInventarioService : MovimientosInventarioService) {
        this.opciones = ["Ingreso por proveedor", "Transferencia desde otra Bodega", "Devolucion por Productor"];
        this.formularios = [];
    }

    activarFormulario(motivo : number) : void {
        if( motivo == 0) this.formularioActivo = "proveedor";
        if( motivo == 1) this.formularioActivo = "transferencia";
        if( motivo == 2) this.formularioActivo = "devolucion";
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