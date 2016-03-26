import {Component, Output, EventEmitter} from "angular2/core";
import {ControlGroup, FormBuilder, Validators} from "angular2/common";

import {PlantacionModel} from "../../../../Model/Administracion/PlantacionModel";
import {EmpresaModel} from "../../../../Model/Administracion/EmpresaModel";
import {AdministracionService} from "../../../../Service/AdministracionService";
import {PlantacionPropietarioPipe} from "../../../../Pipes/PlantacionPropietarioPipe";

@Component({
    selector : 'motivo-ingreso-devolucion',
    pipes : [PlantacionPropietarioPipe],
    template : `
    <div class="form-group" [ngClass]="!toggleValidationFeedback('productor') ? 'has-error' : ''">
        <label class="control-label col-sm-3" for="motivoIngresoDevolucionProductor">Productor</label>
        <div class="col-sm-7 col-md-5">
            <select class="form-control" id="motivoIngresoDevolucionProductor" [ngModel]="productor" (ngModelChange)="objectToFormControl($event, 'productores', 'productor')">
                <option *ngFor="#productor of productores" [value]="productor.id">{{ productor.razon_social }}</option>
            </select>
        </div>
        <div class="col-sm-2 col-md-4">
            <div class="form-control-static control-error">
                <i class="fa fa-exclamation-circle"></i>
                <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
            </div>
        </div>
    </div>
    <div class="form-group" [ngClass]="!toggleValidationFeedback('plantacion') ? 'has-error' : ''">
        <label class="control-label col-sm-3" for="motivoIngresoDevolucionPlantacion">Plantaci&oacute;n</label>
        <div class="col-sm-7 col-md-5">
            <select class="form-control" id="motivoIngresoDevolucionPlantacion" [ngModel]="plantacion" (ngModelChange)="objectToFormControl($event, 'plantaciones', 'plantacion')">
                <option *ngFor="#plantacion of plantaciones | plantacionPropietario : motivoIngresoDevolucion.controls['productor'].value" [value]="plantacion.id">{{ plantacion.nombre }}</option>
            </select>
        </div>
        <div class="col-sm-2 col-md-4">
            <div class="form-control-static control-error">
                <i class="fa fa-exclamation-circle"></i>
                <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
            </div>
        </div>
    </div>
    <div class="form-group" [ngClass]="!toggleValidationFeedback('notas') ? 'has-error' : ''">
        <label class="control-label col-sm-3" for="motivoIngresoDevolucionNota">Notas</label>
        <div class="col-sm-7 col-md-5">
            <textarea class="form-control" placeholder="Notas y Observaciones" id="motivoIngresoDevolucionNota" [(ngFormControl)]="motivoIngresoDevolucion.controls['notas']" ></textarea>
        </div>
        <div class="col-sm-2 col-md-4">
            <div class="form-control-static control-error">
                <i class="fa fa-exclamation-circle"></i>
                <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
            </div>
        </div>
    </div>`
})
export class MotivoIngresoDevolucionComponent {
    @Output() valuesChange = new EventEmitter();

    motivoIngresoDevolucion : ControlGroup;
    productores : EmpresaModel[];
    plantaciones : PlantacionModel[];

    constructor(public _formBuilder : FormBuilder,
                public _administracionService : AdministracionService) {}

    ngOnInit() {
        this.motivoIngresoDevolucion = this._formBuilder.group({
            productor : [1 , Validators.required],
            plantacion :[null , Validators.required],
            notas : [null, Validators.required]
        });

        this._administracionService.getEmpresas(0).subscribe(productores => this.productores = productores);
        this._administracionService.getPlantaciones().subscribe(plantaciones =>this.plantaciones = plantaciones);

        this.motivoIngresoDevolucion.valueChanges.subscribe(() => {
            this.valuesChange.emit(this.motivoIngresoDevolucion);
        });

        this.valuesChange.emit(this.motivoIngresoDevolucion);
    }

    toggleValidationFeedback(control) {
        control = this.motivoIngresoDevolucion.controls[control];
        return !(!control.valid && control.touched);
    }

    objectToFormControl(id, collection, control) : void {
        const result = this[collection].filter((item : any) => item.id == id );
        this.motivoIngresoDevolucion.controls[control].updateValue((result.length == 1) ? result[0] : null);
    }
}