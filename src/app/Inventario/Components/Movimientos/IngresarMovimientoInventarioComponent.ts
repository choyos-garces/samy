import {Component} from 'angular2/core';
import {Router} from "angular2/router";

import {MotivoMovimientoModel} from "../../Models/MotivoMovimientoModel";
import {MovimientoInventarioComponent} from "./MovimientoInventarioComponent";
import {MotivoIngresoTransferenciaComponent} from "./MotivosIngreso/MotivoIngresoTransferenciaComponent";
import {MotivoIngresoDevolucionComponent} from "./MotivosIngreso/MotivoIngresoDevolucionComponent";
import {MotivoIngresoProveedorComponent} from "./MotivosIngreso/MotivoIngresoProveedorComponent";
import {MotivoEgresoProductorComponent} from "./MotivosEgresos/MotivoEgresoProductorComponent";
import {MotivoEgresoProveedorComponent} from "./MotivosEgresos/MotivoEgresoProveedorComponent";
import {MotivoEgresoTransferenciaComponent} from "./MotivosEgresos/MotivoEgresoTransferenciaComponent";
import {MovimientoInventarioModel} from "../../Models/MovimientoInventarioModel";
import {InventarioService} from "../../Services/InventarioService";

@Component({
    selector: 'ingresar-inventario',
    directives: [MovimientoInventarioComponent, MotivoIngresoTransferenciaComponent, MotivoIngresoDevolucionComponent, MotivoIngresoProveedorComponent, MotivoEgresoProductorComponent,MotivoEgresoTransferenciaComponent, MotivoEgresoProveedorComponent],
    template: `<div class="container-fluid">
        <h4>Movimientos de Inventario</h4>
        <form class="form-horizontal" autocomplete="off" spellcheck="false">
            <fieldset [disabled]="waiting">
                <movimiento-inventario (valuesChange)="submitChanges($event, 0)" (cambioMotivoMovimiento)="activarFormulario($event)"></movimiento-inventario>
                <div class="form-group">
                    <div class="col-sm-12 col-md-10"><hr /></div>
                </div>
                <motivo-ingreso-proveedor (valuesChange)="submitChanges($event, 1)" [hidden]="formularioActivo != 1"></motivo-ingreso-proveedor>
                <motivo-ingreso-transferencia (valuesChange)="submitChanges($event, 1)" [hidden]="formularioActivo != 2"></motivo-ingreso-transferencia>
                <motivo-ingreso-devolucion (valuesChange)="submitChanges($event, 1)" [hidden]="formularioActivo != 3"></motivo-ingreso-devolucion>
                <motivo-egreso-productor (valuesChange)="submitChanges($event, 1)" [hidden]="formularioActivo != 4"></motivo-egreso-productor>
                <motivo-egreso-transferencia (valuesChange)="submitChanges($event, 1)" [hidden]="formularioActivo != 5"></motivo-egreso-transferencia>
                <motivo-egreso-proveedor (valuesChange)="submitChanges($event, 1)" [hidden]="formularioActivo != 6"></motivo-egreso-proveedor>
                <div class="form-group">
                    <div class="col-sm-7 col-md-5 col-sm-push-3">
                        <button class="btn btn-primary" [disabled]="!readyToSubmit()" (click)="submit()">Generar Ingreso</button>
                    </div>
                </div>
            </fieldset>
        </form>
    </div>`
})
export class IngresarMovimientoInventarioComponent {
    formularios : any[] = [];
    formularioActivo : number;
    waiting : boolean;

    constructor(public _router : Router,
                public _inventarioService : InventarioService ) {}

    ngOnInit() {
        this.waiting = false;
    }

    activarFormulario(motivoMovimiento : MotivoMovimientoModel) : void {
        this.formularioActivo = (motivoMovimiento != null) ? motivoMovimiento.id : null;
        this.formularios[1] = null;
    }

    submitChanges(data : any, tipo : number) {
        this.formularios[tipo] = data;
    }

    readyToSubmit() : boolean {
        var mainFormValid = (typeof this.formularios[0] !== "undefined" && this.formularios[0] != null);
        var subFormValid = ( typeof this.formularios[1] !== "undefined" && this.formularios[1] != null);

        return mainFormValid && subFormValid;
    }

    submit() {
        if(this.readyToSubmit()) {
            //this.waiting = true;
            const datos = this.formularios[0], detalles = this.formularios[1];
            let movimiento = new MovimientoInventarioModel(null, datos.bodega, datos.tipoMovimiento, datos.motivoMovimiento);
            movimiento.movimientosMateriales = datos.movimientosMateriales;
            movimiento.detalles = detalles;

            this._inventarioService.postMovimiento(movimiento)
                .subscribe(movimiento => {
                    console.log(movimiento);
                    // this._router.navigate(["../../MovimientosInventario"])
                });
        }
    }


}