import {Component, Output, EventEmitter} from "angular2/core";
import {ControlGroup, FormBuilder, Validators} from "angular2/common";
import {ProductoresService} from "../../../../Service/Administracion/ProductoresService";
import {ProductorModel} from "../../../../Model/Administracion/ProductorModel";
import {PlantacionesService} from "../../../../Service/Administracion/PlantacionesService";
import {PlantacionModel} from "../../../../Model/Administracion/PlantacionModel";

@Component({
    selector : "motivo-egreso-productor",
    template : `
    <div class="form-group" [ngClass]=" !toggleValidationFeedback('productor') ? 'has-error' : ''">
        <label class="control-label col-sm-3" for="motivoEgresoProductorProductor">Productor</label>
        <div class="col-sm-7 col-md-5">
            <select class="form-control" id="motivoEgresoProductorProductor" [ngModel]="productor" (ngModelChange)="assignarFormControl($event, 'productores', 'productor')">
                <option *ngFor="#productor of productores;#i = index" [value]="i">{{ productor.nombre }}</option>
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
            <select class="form-control" id="motivoEgresoProductorPlantacion" [ngModel]="plantacion" (ngModelChange)="assignarFormControl($event, 'plantaciones', 'plantacion')">
                <option *ngFor="#plantacion of plantaciones;#i = index" [value]="i">{{ plantacion.nombre }}</option>
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
    productores : Array<ProductorModel>;
    plantaciones : Array<PlantacionModel>;

    constructor(public _formBuilder : FormBuilder,public _productoresService : ProductoresService, public _plantacionesService : PlantacionesService) {
        this.motivoEgresoProductor = this._formBuilder.group({
            productor : [1 , Validators.required],
            plantacion :[null , Validators.required],
            notas : [null, Validators.required]
        });

        this.productores = this._productoresService.getProductores();

        this.motivoEgresoProductor.controls["productor"].valueChanges.subscribe((productor : ProductorModel) => {
            this.plantaciones = this._plantacionesService.getByPropietario(productor);
        });

        this.motivoEgresoProductor.valueChanges.subscribe(() => {
            this.valuesChange.emit(this.motivoEgresoProductor);
        })
    }

    toggleValidationFeedback(control) {
        control = this.motivoEgresoProductor.controls[control];
        return !(!control.valid && control.touched);
    }

    assignarFormControl(index, collection, control) : void {
        this.motivoEgresoProductor.controls[control].updateValue(this[collection][index], {});
    }

    ngOnInit() {
        this.valuesChange.emit(this.motivoEgresoProductor);
    }
}