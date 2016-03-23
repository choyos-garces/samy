import {Component, Output, EventEmitter} from "angular2/core";
import {ControlGroup, FormBuilder, Validators} from "angular2/common";

import {PlantacionesService} from "../../../../Service/Administracion/PlantacionesService";
import {PlantacionModel} from "../../../../Model/Administracion/PlantacionModel";
import {AdministracionService} from "../../../../Service/AdministracionService";
import {EmpresaModel} from "../../../../Model/Administracion/EmpresaModel";
import {PlantacionPropietarioPipe} from "../../../../Pipes/PlantacionPropietarioPipe";

@Component({
    selector : "motivo-egreso-productor",
    pipes : [PlantacionPropietarioPipe],
    template : `
    <div class="form-group" [ngClass]=" !toggleValidationFeedback('productor') ? 'has-error' : ''">
        <label class="control-label col-sm-3" for="motivoEgresoProductorProductor">Productor</label>
        <div class="col-sm-7 col-md-5">
            <select class="form-control" id="motivoEgresoProductorProductor" [ngModel]="productor" (ngModelChange)="objectToFormControl($event, 'productores', 'productor')">
                <option *ngFor="#opcion of productores" [value]="opcion.id">{{ opcion.nombre }}</option>
            </select>
        </div>
        <div class="col-sm-2 col-md-4">
            <div class="form-control-static control-error">
                <i class="fa fa-exclamation-circle"></i>
                <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
            </div>
        </div>
    </div>
    <div class="form-group" [ngClass]=" !toggleValidationFeedback('plantacion') ? 'has-error' : ''">
        <label class="control-label col-sm-3" for="motivoEgresoProductorPlantacion">Plantaci&oacute;n</label>
        <div class="col-sm-7 col-md-5">
            <select class="form-control" id="motivoEgresoProductorPlantacion" [ngModel]="plantacion" (ngModelChange)="objectToFormControl($event, 'plantaciones', 'plantacion')">
                <option *ngFor="#opcion of plantaciones | plantacionPropietario : motivoEgresoProductor.controls['productor']">{{ opcion.nombre }}</option>
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
        <label class="control-label col-sm-3" for="motivoEgresoProductorNota">Notas</label>
        <div class="col-sm-7 col-md-5">
            <textarea class="form-control" placeholder="Notas y Observaciones" id="motivoEgresoProductorNota" [(ngFormControl)]="motivoEgresoProductor.controls['notas']" ></textarea>
        </div>
        <div class="col-sm-2 col-md-4">
            <div class="form-control-static control-error">
                <i class="fa fa-exclamation-circle"></i>
                <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
            </div>
        </div>
    </div>`
})
export class MotivoEgresoProductorComponent {
    @Output() valuesChange = new EventEmitter();
    motivoEgresoProductor : ControlGroup;
    productores : EmpresaModel[] = [];
    plantaciones : PlantacionModel[] = [];

    constructor(public _formBuilder : FormBuilder,
                public _adminsitracionService : AdministracionService,
                public _plantacionesService : PlantacionesService) {}

    toggleValidationFeedback(control) {
        control = this.motivoEgresoProductor.controls[control];
        return !(!control.valid && control.touched);
    }

    objectToFormControl(id, collection : string, control : string) : void {
        const result = this[collection].filter((item : any) => item.id == id);

        this.motivoEgresoProductor.controls[control].updateValue((result.length == 1) ? result[0] : null,{});
    }

    ngOnInit() {

        this.motivoEgresoProductor = this._formBuilder.group({
            productor : [null , Validators.required],
            plantacion :[null , Validators.required],
            notas : [null, Validators.required]
        });

        this.motivoEgresoProductor.valueChanges.subscribe(() => {
            this.valuesChange.emit(this.motivoEgresoProductor);
        });
        
        this._adminsitracionService.getEmpresas(0).subscribe(empresas => this.productores = empresas);
        this.plantaciones = this._plantacionesService.plantaciones;
        
        this.valuesChange.emit(this.motivoEgresoProductor);
    }
}