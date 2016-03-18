import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {FormBuilder,ControlGroup, Validators} from "angular2/common";

import {MovimientoInventarioModel} from "../../../Model/Inventario/MovimientoInventarioModel"
import {MaterialModel} from "../../../Model/Administracion/MaterialModel";
import {MaterialesService} from "../../../Service/Administracion/MaterialesService";
import {BodegasService} from "../../../Service/Administracion/BodegasService";
import {BodegaModel} from "../../../Model/Administracion/BodegaModel"
import {Control} from "angular2/common";

@Component({
    selector : 'movimiento-inventario',
    template : `
    <div class="form-group" [ngClass]=" !toggleValidationFeedback('material') ? 'has-error' : ''">
        <label class="control-label col-sm-3" for="movimientoInventarioMaterial">Materiales</label>
        <div class="col-sm-7 col-md-5">
            <select class="form-control" id="movimientoInventarioMaterial" [(ngFormControl)]="movimientoInventario.controls['material']" >
                <option *ngFor="#material of materiales; #i = index" [value]="material.id">{{ material.nombre }}</option>
            </select>
        </div>
        <div class="col-sm-2 col-md-4">
            <div class="form-control-static control-error">
                <i class="fa fa-exclamation-circle"></i>
                <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
            </div>
        </div>
    </div>
    <div class="form-group" [ngClass]=" !toggleValidationFeedback('cantidad') ? 'has-error' : ''">
        <label class="control-label col-sm-3" for="movimientoInventarioCantidad">Cantidad</label>
        <div class="col-sm-7 col-md-5">
            <input type="number" step="0.01" min="0" class="form-control" id="movimientoInventarioCantidad" [(ngFormControl)]="movimientoInventario.controls['cantidad']" />
        </div>
        <div class="col-sm-2 col-md-4">
            <div class="form-control-static control-error">
                <i class="fa fa-exclamation-circle"></i>
                <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
            </div>
        </div>
    </div>
    <div class="form-group" [ngClass]=" !toggleValidationFeedback('bodega') ? 'has-error' : ''">
        <label class="control-label col-sm-3" for="movimientoInventarioBodega">Bodega</label>
        <div class="col-sm-7 col-md-5">
            <select class="form-control" id="movimientoInventarioBodega" [(ngFormControl)]="movimientoInventario.controls['bodega']" >
                <option *ngFor="#bodega of bodegas; #i = index" [value]="bodega.id">{{ bodega.nombre }}</option>
            </select>
        </div>
        <div class="col-sm-2 col-md-4">
            <div class="form-control-static control-error">
                <i class="fa fa-exclamation-circle"></i>
                <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
            </div>
        </div>
    </div>
    <div class="form-group" [ngClass]=" !toggleValidationFeedback('motivoMovimiento') ? 'has-error' : ''">
        <label class="control-label col-sm-3" for="movimientoInventarioMotivo">Tipo</label>
        <div class="col-sm-7 col-md-5">
            <select class="form-control" id="movimientoInventarioMotivo" [(ngFormControl)]="movimientoInventario.controls['motivoMovimiento']" >
                <option *ngFor="#opcion of opcionesTiposMovimiento; #i = index" [value]="i">{{ opcion }}</option>
            </select>
        </div>
        <div class="col-sm-2 col-md-4">
            <div class="form-control-static control-error">
                <i class="fa fa-exclamation-circle"></i>
                <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
            </div>
        </div>
    </div>`
})
export class MovimientosInventarioComponent {
    @Output() valuesChange = new EventEmitter();
    @Output() cambioMotivoMovimiento = new EventEmitter();
    @Input() tipoMovimiento : number;
    @Input() opcionesTiposMovimiento : Array<string>;

    movimientoInventario : ControlGroup;

    materiales : Array<MaterialModel>;
    bodegas : Array<BodegaModel>;

    constructor(public _formBuilder : FormBuilder,
                public _materailesService : MaterialesService,
                public _bodegasService : BodegasService) {

        this.materiales = this._materailesService.getMateriales();
        this.bodegas = this._bodegasService.getBodegas();

        this.movimientoInventario = this._formBuilder.group({
            material : [null, Validators.required],
            cantidad : [null, Validators.required],
            bodega : [null, Validators.required],
            motivoMovimiento : [null, Validators.required],
            materialObject : [null],
            bodegaObject : [null]
        });

        this.movimientoInventario.valueChanges.subscribe(() => {
            this.valuesChange.emit(this.movimientoInventario)
        });

        this.movimientoInventario.controls["material"].valueChanges.subscribe((value)=>{
            var materialObject = this.materiales.filter((material : MaterialModel)=> {
                return material.id == value;
            });
            this.movimientoInventario.controls["materialObject"].updateValue(materialObject[0], {});
        });

        this.movimientoInventario.controls["bodega"].valueChanges.subscribe((value)=>{
            var bodegaObject = this.bodegas.filter((bodega : BodegaModel)=> {
                return bodega.id == value;
            });
            this.movimientoInventario.controls["bodegaObject"].updateValue(bodegaObject[0], {});
        });

        this.movimientoInventario.controls["motivoMovimiento"].valueChanges.subscribe((value) => {
            this.cambioMotivoMovimiento.emit(value);
        });

    }

    toggleValidationFeedback(control) : boolean {
        control = this.movimientoInventario.controls[control];
        return !(!control.valid && control.touched);
    }

    ngOnInit() {
        this.movimientoInventario.controls["tipoMovimiento"] = new Control(this.tipoMovimiento, Validators.required);
        this.valuesChange.emit(this.movimientoInventario);
    }
}