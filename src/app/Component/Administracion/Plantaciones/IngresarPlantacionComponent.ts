import {Component} from "angular2/core";
import {FORM_DIRECTIVES, FormBuilder, Control,ControlGroup, Validators} from "angular2/common";
import {Router} from "angular2/router";

import {PlantacionesService} from "../../../Service/Administracion/PlantacionesService";
import {PlantacionModel} from "../../../Model/Administracion/PlantacionModel";
import {ProductoresService} from "../../../Service/Administracion/ProductoresService";
import {ProductorModel} from "../../../Model/Administracion/ProductorModel";

@Component({
    selector  : 'ingresar-plantacion',
    directives: [FORM_DIRECTIVES],
    template : `<div class="container-fluid">
        <h4>Crear Ficha de la Plantaci&oacute;n</h4>
        <form [ngFormModel]="ingresoPlantacion" class="form-horizontal"  (ngSubmit)="submit()" autocomplete="off" spellcheck="false">
            <div class="form-group" [ngClass]=" toggleValidationFeedback('propietario') ? 'has-error' : ''">
                <label class="control-label col-sm-4 col-md-3" for="plantacionPropietario">Propietario</label>
                <div class="col-sm-5 col-md-4">
                    <select class="form-control" placeholder="Nombre o alias" id="plantacionPropietario" [(ngFormControl)]="ingresoPlantacion.controls['propietario']" >
                        <option *ngFor="#propietario of propietarios" [value]="propietario.id">{{ propietario.nombre }}</option>
                    </select>
                </div>
                <div class="col-sm-3 col-md-5">
                    <div class="form-control-static control-error">
                        <i class="fa fa-exclamation-circle"></i>
                        <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
                    </div>
                </div>
            </div>
            <div class="form-group" [ngClass]=" toggleValidationFeedback('nombre') ? 'has-error' : ''">
                <label class="control-label col-sm-4 col-md-3" for="plantacionNombre">Nombre</label>
                <div class="col-sm-5 col-md-4">
                    <input type="text" class="form-control" placeholder="Nombre o alias" id="plantacionNombre" [(ngFormControl)]="ingresoPlantacion.controls['nombre']" />
                </div>
                <div class="col-sm-3 col-md-5">
                    <div class="form-control-static control-error">
                        <i class="fa fa-exclamation-circle"></i>
                        <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
                    </div>
                </div>
            </div>
            <div class="form-group" [ngClass]=" toggleValidationFeedback('producto') ? 'has-error' : ''">
                <label class="control-label col-sm-4 col-md-3" for="plantacionProducto">Producto</label>
                <div class="col-sm-5 col-md-4">
                    <select class="form-control" id="plantacionProducto" [(ngFormControl)]="ingresoPlantacion.controls['producto']" >
                        <option *ngFor="#producto of productos; #i = index" [value]="i">{{ producto }}</option>
                    </select>
                </div>
                <div class="col-sm-3 col-md-5">
                    <div class="form-control-static control-error">
                        <i class="fa fa-exclamation-circle"></i>
                        <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
                    </div>
                </div>
            </div>
            <div class="form-group" [ngClass]=" toggleValidationFeedback('tipo') ? 'has-error' : ''">
                <label class="control-label col-sm-4 col-md-3" for="plantacionTipo">Tipo de Producto</label>
                <div class="col-sm-5 col-md-4">
                    <select class="form-control" id="plantacionTipo" [(ngFormControl)]="ingresoPlantacion.controls['tipo']" >
                        <option *ngFor="#tipo of tipos; #i = index" [value]="i">{{ tipo }}</option>
                    </select>
                </div>
                <div class="col-sm-3 col-md-5">
                    <div class="form-control-static control-error">
                        <i class="fa fa-exclamation-circle"></i>
                        <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
                    </div>
                </div>
            </div>
            <div class="form-group" [ngClass]="toggleValidationFeedback('tamano') ? 'has-error' : ''">
                <label class="control-label col-sm-4 col-md-3" for="plantacionTamano">Tama&ntilde;o</label>
                <div class="col-sm-5 col-md-4">
                    <div class="input-group">
                        <input type="number" step="0.01" min="0" class="form-control" placeholder="Cantidad" id="plantacionTamano" [(ngFormControl)]="ingresoPlantacion.controls['tamano']" />
                        <div class="input-group-btn">
                            <select class="form-control" id="plantacionUnidad" [(ngFormControl)]="ingresoPlantacion.controls['unidad']" >
                                <option *ngFor="#unidad of unidades; #i = index" [value]="i">{{ unidad }}.</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="col-sm-3 col-md-5">
                    <div class="form-control-static control-error">
                        <i class="fa fa-exclamation-circle"></i>
                        <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
                    </div>
                </div>
            </div>
            <div class="form-group">
                <div class="col-sm-5 col-md-4 col-sm-push-4 col-md-push-3">
                    <input type="submit" class="btn btn-primary" value="Crear Plantacion" [disabled]="!ingresoPlantacion.valid"/>
                </div>
            </div>
        </form>
    </div>`
})
export class IngresarPlantacionComponent {
    ingresoPlantacion : ControlGroup;
    tipos : Array<string>;
    productos : Array<string>;
    unidades : Array<string>;
    propietarios : Array<ProductorModel>;

    constructor(public _formBuilder : FormBuilder, public _router : Router, public _plantacionesService : PlantacionesService, public _productoresService : ProductoresService ) {
        this.ingresoPlantacion = this._formBuilder.group({
            propietario : [null, Validators.required],
            nombre : [null, Validators.required],
            producto : [null, Validators.required],
            tipo : [null, Validators.required],
            tamano : [null, Validators.required],
            unidad : [0]
        });

        this.tipos = this._plantacionesService.getTipos();
        this.productos = this._plantacionesService.getProductos();
        this.unidades = this._plantacionesService.getUnidades();
        this.propietarios = this._productoresService.getProductores();
    }

    submit() {
        if(this.ingresoPlantacion.valid) {
            const form = this.ingresoPlantacion.value;
            let propietario = this._productoresService.getById(form.propietario);
            let plantacion = new PlantacionModel(null, propietario, form.nombre, form.producto, form.tipo, form.tamano, form.unidad);

            plantacion = this._plantacionesService.push(plantacion);
            this._router.navigate(['VerPlantacion', { id  : plantacion.id }]);
        }
        else {
            alert("Errores en el formulario")
        }
    }

    toggleValidationFeedback(control) {
        control = this.ingresoPlantacion.controls[control];
        return (!control.valid && control.touched);
    }
}