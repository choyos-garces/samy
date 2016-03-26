import {Component, Output, EventEmitter} from 'angular2/core';
import {FormBuilder,ControlGroup, Validators} from "angular2/common";

import {MovimientoMaterialComponent} from "./MovimientoMaterial/MovimientoMaterialComponent";
import {MovimientoListaMaterialesComponent} from "./MovimientoMaterial/MovimientoListaMaterialesComponent";

import {FilterPropertyPipe} from "../../../Pipes/FilterPropertyPipe";

import {BodegaModel} from "../../../Model/Administracion/BodegaModel"
import {MovimientoMaterialModel} from "../../../Model/Inventario/MovimientoMaterialModel";
import {MotivoMovimientoModel} from "../../../Model/Inventario/MotivoMovimientoModel";

import {ControlPanelService} from "../../../Service/ControlPanelService";
import {AdministracionService} from "../../../Service/AdministracionService";



@Component({
    selector : 'movimiento-inventario',
    pipes : [FilterPropertyPipe],
    directives : [MovimientoMaterialComponent, MovimientoListaMaterialesComponent],
    template : `
        <div class="form-group" [ngClass]=" !toggleValidationFeedback('bodega') ? 'has-error' : ''">
        <label class="control-label col-sm-3" for="movimientoInventarioBodega">Movimiento</label>
        <div class="col-sm-7 col-md-5">
            <select class="form-control" id="movimientoInventarioBodega" [(ngFormControl)]="movimientoInventario.controls['tipoMovimiento']">
                <option [value]="1">Ingreso</option>
                <option [value]="0">Egreso</option>
            </select>
        </div>
        <div class="col-sm-2 col-md-4">
            <div class="form-control-static control-error">
                <i class="fa fa-exclamation-circle"></i>
                <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
            </div>
        </div>
    </div>
    <movimiento-material (agregarMaterial)="agregarMaterial($event)"></movimiento-material>
    <movimiento-lista-materiales [materiales]="seleccionMateriales" (actualizarMateriales)="removerMaterial($event)"></movimiento-lista-materiales>
    <div class="form-group" [ngClass]=" !toggleValidationFeedback('bodega') ? 'has-error' : ''">
        <label class="control-label col-sm-3" for="movimientoInventarioBodega">Bodega</label>
        <div class="col-sm-7 col-md-5">
            <select class="form-control" id="movimientoInventarioBodega" [ngModel]="bodega" (ngModelChange)="objectToFormControl($event, 'bodegas', 'bodega')">
                <option *ngFor="#opcion of bodegas" [value]="opcion.id">{{ opcion.nombre }}</option>
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
            <select class="form-control" id="movimientoInventarioMotivo" [ngModel]="motivoMovimiento" (ngModelChange)="objectToFormControl($event, 'motivosMovimiento', 'motivoMovimiento')">
                <option *ngFor="#opcion of motivosMovimiento | filterProperty  : 'number' : 'tipo' : movimientoInventario.controls['tipoMovimiento'].value" [value]="opcion.id">{{ opcion.nombre }}</option>
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
export class MovimientoInventarioComponent {
    @Output() valuesChange = new EventEmitter();
    @Output() cambioMotivoMovimiento = new EventEmitter();

    movimientoInventario : ControlGroup;
    bodegas : Array<BodegaModel>;
    seleccionMateriales : Array<MovimientoMaterialModel> = [];
    motivosMovimiento : Array<MotivoMovimientoModel>;

    constructor(public _formBuilder : FormBuilder,
                public _administracionService : AdministracionService,
                public _controlPanelService : ControlPanelService) {}

    ngOnInit() {
        this._controlPanelService.getMotivosMovimiento().subscribe(motivosMovimiento => this.motivosMovimiento = motivosMovimiento)
        this._administracionService.getBodegas().subscribe(bodegas => this.bodegas = bodegas);

        this.movimientoInventario = this._formBuilder.group({
            tipoMovimiento : [null, Validators.required],
            movimientosMateriales : [null, Validators.required],
            bodega : [null, Validators.required],
            motivoMovimiento : [null, Validators.required]
        });

        this.movimientoInventario.controls["motivoMovimiento"].valueChanges.subscribe((value) => this.cambioMotivoMovimiento.emit(value));
        this.movimientoInventario.controls["tipoMovimiento"].valueChanges.subscribe(() => this.cambioMotivoMovimiento.emit(null));
        this.movimientoInventario.valueChanges.subscribe(() => this.valuesChange.emit(this.movimientoInventario));
    }
    
    agregarMaterial(movimientoMaterial : MovimientoMaterialModel) : void {
        this.seleccionMateriales = [...this.seleccionMateriales, movimientoMaterial];
        this.movimientoInventario.controls["movimientosMateriales"].updateValue(this.seleccionMateriales, {});
    }

    removerMaterial(movimientoMaterial : MovimientoMaterialModel) : void {
        const index = this.seleccionMateriales.indexOf(movimientoMaterial);
        
        this.seleccionMateriales = [...this.seleccionMateriales.slice(0, index), ...this.seleccionMateriales.slice(index +1)];

        if (this.seleccionMateriales.length == 0) this.movimientoInventario.controls["movimientosMateriales"].updateValue(null, {});
        else this.movimientoInventario.controls["movimientosMateriales"].updateValue(this.seleccionMateriales, {});
    }

    toggleValidationFeedback(control) : boolean {
        control = this.movimientoInventario.controls[control];
        return !(!control.valid && control.touched);
    }

    objectToFormControl(id, collection, control) : void {
        const result = this[collection].filter((item : any) => item.id == id );
        this.movimientoInventario.controls[control].updateValue((result.length == 1) ? result[0] : null);
    }
}