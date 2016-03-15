import {Component} from "angular2/core";
import {FORM_DIRECTIVES, FormBuilder, Control,ControlGroup, Validators} from "angular2/common";
import {Router} from "angular2/router";

import {BodegaModel} from "../../../Model/Recursos/BodegaModel";
import {BodegasService} from "../../../Service/Recursos/BodegasService";

@Component({
    selector  : 'ingresar-plantacion',
    directives: [FORM_DIRECTIVES],
    template : `<div class="container-fluid">
        <h4>Crear Ficha de Bodega</h4>
        <form [ngFormModel]="ingresoBodega" class="form-horizontal"  (ngSubmit)="submit()" autocomplete="off" spellcheck="false">
            <div class="form-group" [ngClass]=" !toggleValidationFeedback('codigo') ? 'has-error' : ''">
                <label class="control-label col-sm-4 col-md-3" for="bodegaCodigo">Codigo</label>
                <div class="col-sm-5 col-md-4">
                    <input type="text" class="form-control" placeholder="Codigo de referencia" id="bodegaCodigo" [(ngFormControl)]="ingresoBodega.controls['codigo']" />
                </div>
                <div class="col-sm-3 col-md-5">
                    <div class="form-control-static control-error">
                        <i class="fa fa-exclamation-circle"></i>
                        <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
                    </div>
                </div>
            </div>
            <div class="form-group" [ngClass]=" !toggleValidationFeedback('nombre') ? 'has-error' : ''">
                <label class="control-label col-sm-4 col-md-3" for="bodegaNombre">Nombre</label>
                <div class="col-sm-5 col-md-4">
                    <input type="text" class="form-control" placeholder="Nombre o alias" id="bodegaNombre" [(ngFormControl)]="ingresoBodega.controls['nombre']" />
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
                    <input type="submit" class="btn btn-primary" value="Crear Bodega" [disabled]="!ingresoBodega.valid"/>
                </div>
            </div>
        </form>
    </div>`
})
export class IngresarPlantacionComponent {
    ingresoBodega : ControlGroup;

    constructor(public _formBuilder : FormBuilder, public _bodegaService : BodegasService, public _router : Router ) {
        this.ingresoBodega = this._formBuilder.group({
            nombre : [null, Validators.required],
            codigo : [null, Validators.required]
        });
    }

    submit() {
        if(this.ingresoBodega.valid) {
            const form = this.ingresoBodega.value;
            let bodega = new BodegaModel(form.codigo, form.nombre);
            bodega.fechaIngreso = new Date();

            bodega = this._bodegaService.push(bodega);
            this._router.navigate(['VerBodega', { id  : bodega.id }]);
        }
        else {
            alert("Errores en el formulario")
        }
    }

    toggleValidationFeedback(control) {
        control = this.ingresoBodega.controls[control];
        return !(!control.valid && control.touched);
    }
}