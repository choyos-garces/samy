import {Component} from "angular2/core";
import {FORM_DIRECTIVES, FormBuilder, Control,ControlGroup, Validators} from "angular2/common";
import {Router} from "angular2/router";

import {MaterialesService} from "../../../Service/Administracion/MaterialesService";
import {MaterialModel} from "../../../Model/Administracion/MaterialModel";

@Component({
    selector  : 'ingresar-material',
    directives : [],
    template : `<div class="container-fluid">
        <h4>Crear Ficha Material</h4>
        <form [ngFormModel]="ingresoMaterial" class="form-horizontal"  (ngSubmit)="submit()" autocomplete="off" spellcheck="false">
            <div class="form-group" [ngClass]=" !toggleValidationFeedback('codigo') ? 'has-error' : ''">
                <label class="control-label col-sm-4 col-md-3" for="materialCodigo">Codigo</label>
                <div class="col-sm-5 col-md-4">
                    <input type="text" class="form-control" placeholder="Codigo de referencia" id="materialCodigo" [(ngFormControl)]="ingresoMaterial.controls['codigo']" />
                </div>
                <div class="col-sm-3 col-md-5">
                    <div class="form-control-static control-error">
                        <i class="fa fa-exclamation-circle"></i>
                        <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
                    </div>
                </div>
            </div>
            <div class="form-group" [ngClass]=" !toggleValidationFeedback('nombre') ? 'has-error' : ''">
                <label class="control-label col-sm-4 col-md-3" for="materialNombre">Nombre</label>
                <div class="col-sm-5 col-md-4">
                    <input type="text" class="form-control" placeholder="Nombre o alias" id="materialNombre" [(ngFormControl)]="ingresoMaterial.controls['nombre']" />
                </div>
                <div class="col-sm-3 col-md-5">
                    <div class="form-control-static control-error">
                        <i class="fa fa-exclamation-circle"></i>
                        <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
                    </div>
                </div>
            </div>
            <div class="form-group" [ngClass]=" !toggleValidationFeedback('tipo') ? 'has-error' : ''">
                <label class="control-label col-sm-4 col-md-3" for="materialTipo">Tipo de Material</label>
                <div class="col-sm-5 col-md-4">
                    <select id="materialTipo" class="form-control" [(ngFormControl)]="ingresoMaterial.controls['tipo']" >
                        <option *ngFor="#tipo of tiposMaterial; #i = index" [value]="i">{{ tipo }}</option>
                    </select>
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
                    <input type="submit" class="btn btn-primary" value="Crear material" [disabled]="!ingresoMaterial.valid"/>
                </div>
            </div>
        </form>
    </div>`
})
export class IngresarMaterialComponent {
    tiposMaterial : Array<string>;
    ingresoMaterial : ControlGroup;

    constructor(public _formBuilder : FormBuilder, public _router : Router, public _materialesService : MaterialesService) {
        this.ingresoMaterial = this._formBuilder.group({
            nombre : [null, Validators.required],
            codigo : [null, Validators.required],
            tipo : [null, Validators.required]
        });

        this.tiposMaterial = this._materialesService.getTiposMaterial();

    }

    submit() {
        if(this.ingresoMaterial.valid) {
            const form = this.ingresoMaterial.value;
            let material = new MaterialModel(form.codigo, form.nombre, form.tipo);

            material = this._materialesService.push(material);
            this._router.navigate(['VerMaterial', { id  : material.id }]);
        }
        else {
            alert("Errores en el formulario")
        }
    }

    toggleValidationFeedback(control) {
        control = this.ingresoMaterial.controls[control];
        return !(!control.valid && control.touched);
    }
}