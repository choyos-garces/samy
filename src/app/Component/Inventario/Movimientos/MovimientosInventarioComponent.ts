import {Component, Input, Output, EventEmitter} from 'angular2/core';
import {FormBuilder,ControlGroup, Validators, Control} from "angular2/common";

import {MovimientoMaterialComponent} from "./MovimientoMaterialComponent";
import {BodegaModel} from "../../../Model/Administracion/BodegaModel"
import {BodegasService} from "../../../Service/Administracion/BodegasService";
import {MovimientoListaMaterialesComponent} from "./MovimientoListaMaterialesComponent";
import {MovimientoMaterialModel} from "../../../Model/Inventario/MovimientoMaterialModel";

@Component({
    selector : 'movimiento-inventario',
    directives : [MovimientoMaterialComponent, MovimientoListaMaterialesComponent],
    template : `
    <movimiento-material (agregarMaterial)="agregarMaterial($event)"></movimiento-material>
    <movimiento-lista-materiales [materiales]="seleccionMateriales" (actualizarMateriales)="removerMaterial($event)"></movimiento-lista-materiales>
    <div class="form-group" [ngClass]=" !toggleValidationFeedback('bodega') ? 'has-error' : ''">
        <label class="control-label col-sm-3" for="movimientoInventarioBodega">Bodega</label>
        <div class="col-sm-7 col-md-5">
            <select class="form-control" id="movimientoInventarioBodega" [ngModel]="bodega" (ngModelChange)="assignarFormControl($event, 'bodegas', 'bodega')">
                <option *ngFor="#opcion of bodegas; #i = index" [value]="i">{{ opcion.nombre }}</option>
            </select>
        </div>
        <div class="col-sm-2 col-md-4">
            <div class="form-control-static control-error">
                <i class="fa fa-exclamation-circle"></i>
                <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
            </div>
        </div>
    </div>
    <div class="form-group" [ngClass]="!toggleValidationFeedback('motivoMovimiento') ? 'has-error' : ''">
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
    bodegas : Array<BodegaModel>;
    seleccionMateriales : Array<MovimientoMaterialModel> = [];

    constructor(public _formBuilder : FormBuilder, public _bodegasService : BodegasService) {

        this.bodegas = this._bodegasService.getBodegas();

        this.movimientoInventario = this._formBuilder.group({
            movimientosMateriales : [null, Validators.required],
            bodega : [null, Validators.required],
            motivoMovimiento : [null, Validators.required]
        });

        this.movimientoInventario.valueChanges.subscribe(() => {
            this.valuesChange.emit(this.movimientoInventario)
        });

        this.movimientoInventario.controls["motivoMovimiento"].valueChanges.subscribe((value) => {
            this.cambioMotivoMovimiento.emit(value);
        });

    }

    agregarMaterial(movimientoMaterial : MovimientoMaterialModel) : void {
        this.seleccionMateriales = [
            ...this.seleccionMateriales,
            movimientoMaterial
        ];

        this.movimientoInventario.controls["movimientosMateriales"].updateValue(this.seleccionMateriales, {});
    }

    removerMaterial(movimientoMaterial : MovimientoMaterialModel) : void {
        const index = this.seleccionMateriales.indexOf(movimientoMaterial);
        
        this.seleccionMateriales = [
            ...this.seleccionMateriales.slice(0, index),
            ...this.seleccionMateriales.slice(index +1)
        ];

        if(this.seleccionMateriales.length == 0) {
            this.movimientoInventario.controls["movimientosMateriales"].updateValue(null, {});
        }
        else {
            this.movimientoInventario.controls["movimientosMateriales"].updateValue(this.seleccionMateriales, {});
        }
    }

    toggleValidationFeedback(control) : boolean {
        control = this.movimientoInventario.controls[control];
        return !(!control.valid && control.touched);
    }

    assignarFormControl(index, collection, control) : void {
        this.movimientoInventario.controls[control].updateValue(this[collection][index], {});
    }

    ngOnInit() {
        this.movimientoInventario.controls["tipoMovimiento"] = new Control(this.tipoMovimiento, Validators.required);
        this.valuesChange.emit(this.movimientoInventario);
    }
}