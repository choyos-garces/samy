import {Component} from "angular2/core";
import {FormBuilder, ControlGroup, Validators, Control} from "angular2/common";
import {Router} from "angular2/router";

import {MaterialModel} from "../../Models/MaterialModel";
import {SimpleKey} from "../../../ControlPanel/Models/SimpleKey";
import {AdministracionService} from "../../Services/AdministracionService";
import {OpcionesService} from "../../../ControlPanel/Services/OpcionesService";

@Component({
    selector  : 'ingresar-material',
    directives : [],
    template : `<div class="container-fluid">
        <h4>Crear Ficha Material</h4>
        <form [ngFormModel]="ingresoMaterial" class="form-horizontal"  (ngSubmit)="submit()" autocomplete="off" spellcheck="false">
            <fieldset [disabled]="waiting">
                <div class="form-group" [ngClass]=" !toggleValidationFeedback('codigo') ? 'has-error' : ''">
                    <label class="control-label col-sm-3" for="materialCodigo">Codigo</label>
                    <div class="col-sm-7 col-md-5">
                        <input type="text" class="form-control" placeholder="Codigo de referencia" id="materialCodigo" [(ngFormControl)]="ingresoMaterial.controls['codigo']" />
                    </div>
                    <div class="col-sm-2 col-md-4">
                        <div class="form-control-static control-error">
                            <i class="fa fa-exclamation-circle"></i>
                            <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
                        </div>
                    </div>
                </div>
                <div class="form-group" [ngClass]=" !toggleValidationFeedback('nombre') ? 'has-error' : ''">
                    <label class="control-label col-sm-3" for="materialNombre">Nombre</label>
                    <div class="col-sm-7 col-md-5">
                        <input type="text" class="form-control" placeholder="Nombre o alias" id="materialNombre" [(ngFormControl)]="ingresoMaterial.controls['nombre']" />
                    </div>
                    <div class="col-sm-2 col-md-4">
                        <div class="form-control-static control-error">
                            <i class="fa fa-exclamation-circle"></i>
                            <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
                        </div>
                    </div>
                </div>
                <div class="form-group" [ngClass]=" !toggleValidationFeedback('tipo') ? 'has-error' : ''">
                    <label class="control-label col-sm-3" for="materialTipo">Tipo de Material</label>
                    <div class="col-sm-7 col-md-5">
                        <select id="materialTipo" class="form-control" [ngModel]="tipoMaterial" (ngModelChange)="objectToFormControl($event, 'tiposMaterial', 'tipo')">
                            <option *ngFor="#opcion of tiposMaterial" [value]="opcion.id">{{ opcion.nombre }}</option>
                        </select>
                    </div>
                    <div class="col-sm-2 col-md-4">
                        <div class="form-control-static control-error">
                            <i class="fa fa-exclamation-circle"></i>
                            <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
                        </div>
                    </div>
                </div>
                <div class="form-group">
                    <div class="col-sm-7 col-md-5 col-sm-push-3">
                        <input type="submit" class="btn btn-primary" value="Crear material" [disabled]="!ingresoMaterial.valid"/>
                    </div>
                </div>
            </fieldset>
        </form>
    </div>`
})
export class IngresarMaterialComponent {
    tiposMaterial : Array<SimpleKey>;
    ingresoMaterial : ControlGroup;
    waiting : boolean;

    constructor(public _formBuilder : FormBuilder,
                public _router : Router,
                public _administracionService : AdministracionService, 
                public _opcionesService :OpcionesService) {}

    ngOnInit() {
        this.ingresoMaterial = this._formBuilder.group({
            nombre : [null, Validators.required],
            codigo : [null, Validators.required],
            tipo : [null, Validators.required]
        });

        this._opcionesService.getTiposMaterial().subscribe(response => {
            this.tiposMaterial = response;
        }, error => console.log(error));

        this.waiting = false;
    }

    submit() {
        if(this.ingresoMaterial.valid) {
            this.waiting = true;
            const form = this.ingresoMaterial.value;
            let material = new MaterialModel(null, form.codigo, form.nombre, form.tipo);

            this._administracionService.postMaterial(material).subscribe(material => {
                this.waiting = false;
                this._router.navigate(['VerMaterial', { id  : material.id }]);
            });
        }
        else {
            alert("Errores en el formulario")
        }
    }

    toggleValidationFeedback(control) {
        control = this.ingresoMaterial.controls[control];
        return !(!control.valid && control.touched);
    }

    objectToFormControl(id, collection, control) : void {
        const results = this[collection].filter((item : any) => item.id == id);

        (<Control>this.ingresoMaterial.controls[control]).updateValue((results.length == 1) ? results[0] : null, {});
    }
    
}