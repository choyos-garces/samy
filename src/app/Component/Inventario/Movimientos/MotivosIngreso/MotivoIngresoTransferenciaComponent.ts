import {Component, Output, EventEmitter} from "angular2/core";
import {ControlGroup, FormBuilder, Validators, Control} from "angular2/common";

import {BodegaModel} from "../../../../Model/Administracion/BodegaModel";
import {AdministracionService} from "../../../../Service/AdministracionService";

@Component({
    selector : 'motivo-ingreso-transferencia',
    template : `
    <div class="form-group" [ngClass]=" !toggleValidationFeedback('bodega') ? 'has-error' : ''">
        <label class="control-label col-sm-3" for="motivoIngresoTransferenciaBodega">Bodega</label>
        <div class="col-sm-7 col-md-5">
            <select class="form-control" id="motivoIngresoTransferenciaBodega" [ngModel]="bodega" (ngModelChange)="assignarFormControl($event, 'bodegas', 'bodega')">
                <option *ngFor="#bodega of bodegas;#i = index" [value]="i">{{ bodega.nombre }}</option>
            </select>
        </div>
        <div class="col-sm-2 col-md-4">
            <div class="form-control-static control-error">
                <i class="fa fa-exclamation-circle"></i>
                <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
            </div>
        </div>
    </div>
    <div class="form-group" [ngClass]=" !toggleValidationFeedback('notas') ? 'has-error' : ''">
        <label class="control-label col-sm-3" for="motivoIngresoTransferenciaNota">Notas</label>
        <div class="col-sm-7 col-md-5">
            <textarea class="form-control" placeholder="Notas y observaciones" id="motivoIngresoTransferenciaNota" [(ngFormControl)]="motivoIngresoTransferencia.controls['notas']" ></textarea>
        </div>
        <div class="col-sm-2 col-md-4">
            <div class="form-control-static control-error">
                <i class="fa fa-exclamation-circle"></i>
                <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
            </div>
        </div>
    </div>`
})
export class MotivoIngresoTransferenciaComponent {
    @Output() valuesChange = new EventEmitter();
    motivoIngresoTransferencia : ControlGroup;
    bodegas : Array<BodegaModel>;

    constructor(public _formBuilder : FormBuilder,
                public _administracionService : AdministracionService) {}

    toggleValidationFeedback(control) {
        control = this.motivoIngresoTransferencia.controls[control];
        return !(!control.valid && control.touched);
    }

    assignarFormControl(index, collection, control) : void {
        this.motivoIngresoTransferencia.controls[control].updateValue(this[collection][index], {});
    }

    ngOnInit() {
        this.motivoIngresoTransferencia = this._formBuilder.group({
            bodega : [1 , Validators.required],
            notas : [null, Validators.required]
        });

        this._administracionService.getBodegas().subscribe(bodegas => this.bodegas = bodegas);

        this.motivoIngresoTransferencia.valueChanges.subscribe(() => {
            this.valuesChange.emit(this.motivoIngresoTransferencia);
        });
    }
}