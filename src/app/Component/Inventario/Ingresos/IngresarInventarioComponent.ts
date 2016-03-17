import {Component} from 'angular2/core';
import {FormBuilder,ControlGroup, Validators} from "angular2/common";
import {Router} from "angular2/router";

import {IngresarInventarioDevolucionComponent} from './IngresarInventario/IngresarInventarioDevolucionComponent'
import {IngresarInventarioTransferenciaComponent} from './IngresarInventario/IngresarInventarioTransferenciaComponent'
import {IngresarInventarioProveedorComponent} from './IngresarInventario/IngresarInventarioProveedorComponent'


import {MovimientoInventarioModel} from "../../../Model/Inventario/MovimientoInventarioModel"
import {MovimientosInventarioService} from "../../../Service/Inventario/MovimientosInventarioService";
import {MaterialModel} from "../../../Model/Administracion/MaterialModel";
import {MaterialesService} from "../../../Service/Administracion/MaterialesService";
import {BodegasService} from "../../../Service/Administracion/BodegasService";
import {BodegaModel} from "../../../Model/Administracion/BodegaModel";

@Component({
    selector: 'ingresar-ingreso-inventario',
    directives: [IngresarInventarioDevolucionComponent, IngresarInventarioProveedorComponent, IngresarInventarioTransferenciaComponent],
    template: `<div class="container-fluid">
        <h4>Generar Ingreso a Inventario</h4>
        <form [ngFormModel]="ingresarIngresoInventario" class="form-horizontal"  (ngSubmit)="submit()" autocomplete="off" spellcheck="false">
            <div class="form-group" [ngClass]=" !toggleValidationFeedback('material') ? 'has-error' : ''">
                <label class="control-label col-sm-4 col-md-3" for="ingresarInventarioMaterial">Materiales</label>
                <div class="col-sm-5 col-md-4">
                    <select class="form-control" id="ingresarInventarioMaterial" [(ngFormControl)]="ingresarIngresoInventario.controls['material']" >
                        <option *ngFor="#material of materiales; #i = index" [value]="material.id">{{ material.nombre }}</option>
                    </select>
                </div>
                <div class="col-sm-3 col-md-5">
                    <div class="form-control-static control-error">
                        <i class="fa fa-exclamation-circle"></i>
                        <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
                    </div>
                </div>
            </div>
            <div class="form-group" [ngClass]=" !toggleValidationFeedback('cantidad') ? 'has-error' : ''">
                <label class="control-label col-sm-4 col-md-3" for="ingresarInventarioCantidad">Cantidad</label>
                <div class="col-sm-5 col-md-4">
                    <input type="number" step="0.01" min="0" class="form-control" id="ingresarInventarioCantidad" [(ngFormControl)]="ingresarIngresoInventario.controls['cantidad']" />
                </div>
                <div class="col-sm-3 col-md-5">
                    <div class="form-control-static control-error">
                        <i class="fa fa-exclamation-circle"></i>
                        <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
                    </div>
                </div>
            </div>
            <div class="form-group" [ngClass]=" !toggleValidationFeedback('bodega') ? 'has-error' : ''">
                <label class="control-label col-sm-4 col-md-3" for="ingresarInventarioBodega">Bodega</label>
                <div class="col-sm-5 col-md-4">
                    <select class="form-control" id="ingresarInventarioBodega" [(ngFormControl)]="ingresarIngresoInventario.controls['bodega']" >
                        <option *ngFor="#bodega of bodegas; #i = index" [value]="bodega.id">{{ bodega.nombre }}</option>
                    </select>
                </div>
                <div class="col-sm-3 col-md-5">
                    <div class="form-control-static control-error">
                        <i class="fa fa-exclamation-circle"></i>
                        <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
                    </div>
                </div>
            </div>
            <div class="form-group" [ngClass]=" !toggleValidationFeedback('motivoMovimiento') ? 'has-error' : ''">
                <label class="control-label col-sm-4 col-md-3" for="ingresarInventarioMotivoMovimiento">Origen</label>
                <div class="col-sm-5 col-md-4">
                    <select class="form-control" id="ingresarInventarioMotivoMovimiento" [(ngFormControl)]="ingresarIngresoInventario.controls['motivoMovimiento']" >
                        <option *ngFor="#motivo of motivosMovimiento; #i = index" [value]="i">{{ motivo }}</option>
                    </select>
                </div>
                <div class="col-sm-3 col-md-5">
                    <div class="form-control-static control-error">
                        <i class="fa fa-exclamation-circle"></i>
                        <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-8 col-md-9"><hr /></div>
            </div>
            <ingreso-proveedor (submitForm)="addForms($event)" [hidden]="ingresarIngresoInventario.controls['motivoMovimiento'].value != 0"></ingreso-proveedor>
            <ingreso-transferencia (submitForm)="addForms($event)" [hidden]="ingresarIngresoInventario.controls['motivoMovimiento'].value != 1"></ingreso-transferencia>
            <ingreso-devolucion (submitForm)="addForms($event)" [hidden]="ingresarIngresoInventario.controls['motivoMovimiento'].value != 2"></ingreso-devolucion>
            <div class="form-group">
                <div class="col-sm-5 col-md-4 col-sm-push-4 col-md-push-3">
                    <input type="submit" class="btn btn-primary" value="Generar Ingreso" [disabled]="!checkForms()" />
                </div>
            </div>
        </form>
        </div>`
})
export class IngresarInventarioComponent {
    ingresarIngresoInventario : ControlGroup;
    ingresarDatosIngresarPorTransferencia : ControlGroup;
    ingresarDatosIngresarPorProveedor : ControlGroup;
    ingresarDatosIngresarPorProductor : ControlGroup;

    materiales : Array<MaterialModel>;
    motivosMovimiento : Array<string>;
    bodegas : Array<BodegaModel>;

    constructor(public _formBuilder : FormBuilder,
                public _router : Router,
                public _movimientosService : MovimientosInventarioService,
                public _materailesService : MaterialesService, 
                public _bodegasService : BodegasService) {


        this.motivosMovimiento = ["Ingreso por proveedor", "Transferencia desde otra Bodega", "Devolucion por Productor"];
        this.materiales = this._materailesService.getMateriales();
        this.bodegas = this._bodegasService.getBodegas();
        
        this.ingresarIngresoInventario = this._formBuilder.group({
            tipoMovimiento : [1, Validators.required],
            material : [1, Validators.required],
            cantidad : [null, Validators.required],
            bodega : [1, Validators.required],
            motivoMovimiento : [null, Validators.required]
        });

    }

    addForms(form : ControlGroup) : void {
        const type = form.value.form;
        if(type == "productor") this.ingresarDatosIngresarPorProductor = form;
        if(type == "proveedor") this.ingresarDatosIngresarPorProveedor = form;
        if(type == "transferencia") this.ingresarDatosIngresarPorTransferencia = form;
    }

    checkForms() : boolean {
        var flagA = false, flagB = false;
        if(this.ingresarIngresoInventario.valid) {
            flagA = true;

            const formMovimientos = this.ingresarIngresoInventario.value;
            if( formMovimientos.motivoMovimiento == 0 && typeof this.ingresarDatosIngresarPorProveedor != "undefined") {
                flagB = this.ingresarDatosIngresarPorProveedor.valid;
            }
            if( formMovimientos.motivoMovimiento == 1 && typeof this.ingresarDatosIngresarPorTransferencia != "undefined" ) {
                flagB = this.ingresarDatosIngresarPorTransferencia.valid
            }
            if( formMovimientos.motivoMovimiento == 2 && typeof this.ingresarDatosIngresarPorProductor != "undefined" ) {
                flagB = this.ingresarDatosIngresarPorProductor.valid
            }

        }

        return flagA && flagB;
    }

    submit() {

    }

    toggleValidationFeedback(control) : boolean {
        control = this.ingresarIngresoInventario.controls[control];
        return !(!control.valid && control.touched);
    }
}