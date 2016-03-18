import {Component, Output, EventEmitter} from "angular2/core";
import {ControlGroup, FormBuilder, Validators} from "angular2/common";
import {BodegaModel} from "../../../../Model/Administracion/BodegaModel";
import {BodegasService} from "../../../../Service/Administracion/BodegasService";

@Component({
    selector : "motivo-egreso-transferencia",
    template : `
        <div class="form-group" [ngClass]=" !toggleValidationFeedback('bodega') ? 'has-error' : ''">
        <label class="control-label col-sm-3" for="motivoEgresoTransferenciaBodega">Bodega</label>
        <div class="col-sm-7 col-md-5">
            <select class="form-control" id="motivoEgresoTransferenciaBodega" [(ngFormControl)]="motivoEgresoTransferencia.controls['bodega']" >
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
        <label class="control-label col-sm-3" for="motivoEgresoTransferenciaNota">Notas</label>
        <div class="col-sm-7 col-md-5">
            <textarea class="form-control" placeholder="Notas y observaciones" id="motivoEgresoTransferenciaNota" [(ngFormControl)]="motivoEgresoTransferencia.controls['notas']" ></textarea>
        </div>
        <div class="col-sm-2 col-md-4">
            <div class="form-control-static control-error">
                <i class="fa fa-exclamation-circle"></i>
                <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
            </div>
        </div>
    </div>`
})
export class MotivoEgresoTransferenciaComponent {
    @Output() valuesChange = new EventEmitter();
    motivoEgresoTransferencia : ControlGroup;
    bodegas : Array<BodegaModel>;

    constructor(public _formBuilder  : FormBuilder, public _bodegasService : BodegasService) {
        this.motivoEgresoTransferencia = this._formBuilder.group({
            bodega : [1, Validators.required],
            notas : [null, Validators.required]
        });

        this.bodegas = this._bodegasService.getBodegas();

        this.motivoEgresoTransferencia.valueChanges.subscribe(() => {
            this.valuesChange.emit(this.motivoEgresoTransferencia);
        })
    }

    toggleValidationFeedback(control) {
        control = this.motivoEgresoTransferencia.controls[control];
        return !(!control.valid && control.touched);
    }

    ngOnInit() {
        this.valuesChange.emit(this.motivoEgresoTransferencia);
    }
}