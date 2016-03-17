import {Component, Output, EventEmitter} from "angular2/core";
import {ControlGroup, FormBuilder, Validators} from "angular2/common";

import {ProductorModel} from "../../../../Model/Administracion/ProductorModel";
import {ProductoresService} from "../../../../Service/Administracion/ProductoresService";
import {PlantacionesService} from "../../../../Service/Administracion/PlantacionesService";
import {PlantacionModel} from "../../../../Model/Administracion/PlantacionModel";

@Component({
    selector : 'ingreso-devolucion',
    template : `
    <div class="form-group" [ngClass]=" !toggleValidationFeedback('productor') ? 'has-error' : ''">
        <label class="control-label col-sm-4 col-md-3" for="ingresoInventaroProductorProductor">Productor</label>
        <div class="col-sm-5 col-md-4">
            <select class="form-control" id="ingresoInventaroProductorProductor" [(ngFormControl)]="ingresoInventarioProductor.controls['productor']" >
                <option *ngFor="#productor of productores" [value]="productor.id">{{ productor.nombre }}</option>
            </select>
        </div>
        <div class="col-sm-3 col-md-5">
            <div class="form-control-static control-error">
                <i class="fa fa-exclamation-circle"></i>
                <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
            </div>
        </div>
    </div>
    <div class="form-group" [ngClass]=" !toggleValidationFeedback('plantacion') ? 'has-error' : ''">
        <label class="control-label col-sm-4 col-md-3" for="ingresoInventaroProductorPlantacion">Plantaci&oacute;n</label>
        <div class="col-sm-5 col-md-4">
            <select class="form-control" id="ingresoInventaroProductorPlantacion" [(ngFormControl)]="ingresoInventarioProductor.controls['plantacion']" >
                <option *ngFor="#plantacion of plantaciones" [value]="plantacion.id">{{ plantacion.nombre }}</option>
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
        <label class="control-label col-sm-4 col-md-3" for="ingresoInventaroProductorNota">Notas</label>
        <div class="col-sm-5 col-md-4">
            <textarea class="form-control" placeholder="Notas y Observaciones" id="ingresoInventaroProductorNota" [(ngFormControl)]="ingresoInventarioProductor.controls['notas']" ></textarea>
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
export class IngresarInventarioDevolucionComponent {
    @Output() submitForm = new EventEmitter();

    ingresoInventarioProductor : ControlGroup;
    productores : Array<ProductorModel>;
    plantaciones : Array<PlantacionModel>;

    constructor(public _formBuilder : FormBuilder, public _productoresService : ProductoresService, public _plantacionesService : PlantacionesService) {
        this.ingresoInventarioProductor = this._formBuilder.group({
            form : ["productor"],
            productor : [1 , Validators.required],
            plantacion :[null , Validators.required],
            notas : [null, Validators.required]
        });

        this.productores = this._productoresService.getProductores();

        this.ingresoInventarioProductor.controls["productor"].valueChanges.subscribe((id : number) => {
            var productor = new ProductorModel({id : id});
            this.plantaciones = this._plantacionesService.getByPropietario(productor);
        });

        this.ingresoInventarioProductor.valueChanges.subscribe(() => {
            this.submitForm.emit(this.ingresoInventarioProductor);
        })
    }

    toggleValidationFeedback(control) {
        control = this.ingresoInventarioProductor.controls[control];
        return !(!control.valid && control.touched);
    }

    ngOnInit() {
        this.submitForm.emit(this.ingresoInventarioProductor);
    }
}