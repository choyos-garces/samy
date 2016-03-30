import {Component, Output, EventEmitter} from "angular2/core";
import {ControlGroup, FormBuilder, Validators, Control} from "angular2/common";

import {BodegaModel} from "../../../../Administracion/Models/BodegaModel";
import {AdministracionService} from "../../../../Administracion/Services/AdministracionService";

@Component({
    selector : 'motivo-ingreso-transferencia',
    template : `
    <div class="form-group" [ngClass]=" !toggleValidationFeedback('bodega') ? 'has-error' : ''">
        <label class="control-label col-sm-3" for="motivoIngresoTransferenciaBodega">Bodega</label>
        <div class="col-sm-7 col-md-5">
            <select class="form-control" id="motivoIngresoTransferenciaBodega" [ngModel]="bodega" (ngModelChange)="objectToFormControl($event, 'bodegas', 'bodega')">
                <option *ngFor="#bodega of bodegas" [value]="bodega.id">{{ bodega.nombre }}</option>
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

    ngOnInit() {
        this._administracionService.getBodegas().subscribe(bodegas => this.bodegas = bodegas);

        this.motivoIngresoTransferencia = this._formBuilder.group({
            bodega : [null , Validators.required],
            notas : [null, Validators.required]
        });

        this.motivoIngresoTransferencia.valueChanges.subscribe(() => this.emitirValores());
    }

    emitirValores() : void {
        if(this.motivoIngresoTransferencia.valid) {
            const opciones = {
                bodega : <BodegaModel> this.motivoIngresoTransferencia.value.bodega,
                notas : <string> this.motivoIngresoTransferencia.value.notas
            };
            return this.valuesChange.emit(opciones);
        }
        else
            return this.valuesChange.emit(null);
    }

    toggleValidationFeedback(control) {
        control = this.motivoIngresoTransferencia.controls[control];
        return !(!control.valid && control.touched);
    }

    objectToFormControl(id, collection : string, control : string) : void {
        const result = this[collection].filter((item : any) => item.id == id );
        (<Control>this.motivoIngresoTransferencia.controls[control]).updateValue((result.length == 1) ? result[0] : null, {});
    }
}