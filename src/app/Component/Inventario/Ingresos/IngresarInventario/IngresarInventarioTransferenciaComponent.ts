import {Component, Output, EventEmitter} from "angular2/core";
import {ControlGroup, FormBuilder, Validators} from "angular2/common";

import {BodegaModel} from "../../../../Model/Administracion/BodegaModel";
import {BodegasService} from "../../../../Service/Administracion/BodegasService";

@Component({
    selector : 'ingreso-transferencia',
    template : `
    <div class="form-group" [ngClass]=" !toggleValidationFeedback('bodega') ? 'has-error' : ''">
        <label class="control-label col-sm-4 col-md-3" for="ingresoInventaroTransferenciaBodega">Bodega</label>
        <div class="col-sm-5 col-md-4">
            <select class="form-control" id="ingresoInventaroTransferenciaBodega" [(ngFormControl)]="ingresoInventarioTransferencia.controls['bodega']" >
                <option *ngFor="#bodega of bodegas" [value]="bodega.id">{{ bodega.nombre }}</option>
            </select>
        </div>
        <div class="col-sm-3 col-md-5">
            <div class="form-control-static control-error">
                <i class="fa fa-exclamation-circle"></i>
                <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
            </div>
        </div>
    </div>
    <div class="form-group" [ngClass]=" !toggleValidationFeedback('notas') ? 'has-error' : ''">
        <label class="control-label col-sm-4 col-md-3" for="ingresoInventaroTransferenciaNota">Notas</label>
        <div class="col-sm-5 col-md-4">
            <textarea class="form-control" placeholder="Notas y observaciones" id="ingresoInventaroTransferenciaNota" [(ngFormControl)]="ingresoInventarioTransferencia.controls['notas']" ></textarea>
        </div>
        <div class="col-sm-3 col-md-5">
            <div class="form-control-static control-error">
                <i class="fa fa-exclamation-circle"></i>
                <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
            </div>
        </div>
    </div>
    `
})
export class IngresarInventarioTransferenciaComponent {
    @Output() submitForm = new EventEmitter();

    ingresoInventarioTransferencia : ControlGroup;
    bodegas : Array<BodegaModel>;

    constructor(public _formBuilder : FormBuilder, public _bodegasService : BodegasService) {
        this.ingresoInventarioTransferencia = this._formBuilder.group({
            form : ["transferencia"],
            bodega : [1 , Validators.required],
            notas : [null, Validators.required]
        });

        this.bodegas = this._bodegasService.getBodegas();

        this.ingresoInventarioTransferencia.valueChanges.subscribe(() => {
            this.submitForm.emit(this.ingresoInventarioTransferencia);
        })
    }

    toggleValidationFeedback(control) {
        control = this.ingresoInventarioTransferencia.controls[control];
        return !(!control.valid && control.touched);
    }

    ngOnInit() {
        this.submitForm.emit(this.ingresoInventarioTransferencia);
    }
}