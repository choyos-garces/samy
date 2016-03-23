import {Component} from "angular2/core";
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Validators} from "angular2/common";
import {Router, RouteParams} from "angular2/router";

import {PlantacionModel} from "../../../Model/Administracion/PlantacionModel";
import {SimpleKey} from "../../../Model/SimpleKey";
import {EmpresaModel} from "../../../Model/Administracion/EmpresaModel";
import {AdministracionService} from "../../../Service/AdministracionService";
import {OpcionesService} from "../../../Service/OpcionesService";

@Component({
    selector  : 'ingresar-plantacion',
    directives: [FORM_DIRECTIVES],
    template : `<div class="container-fluid">
        <h4>Crear Ficha de la Plantaci&oacute;n</h4>
        <form [ngFormModel]="ingresoPlantacion" class="form-horizontal"  (ngSubmit)="submit()" autocomplete="off" spellcheck="false">
            <div class="form-group" [ngClass]=" toggleValidationFeedback('propietario') ? 'has-error' : ''">
                <label class="control-label col-sm-3" for="plantacionPropietario">Propietario</label>
                <div class="col-sm-7 col-md-5">
                    <select class="form-control" id="plantacionPropietario" [ngModel]="propietario" (ngModelChange)="objectToFormControl($event, 'propietarios', 'propietario')" >
                        <option *ngFor="#opcion of propietarios" [value]="opcion.id">{{ opcion.razon_social }} &lt;{{ opcion.identificacion }}&gt;</option>
                    </select>
                </div>
                <div class="col-sm-2 col-md-4">
                    <div class="form-control-static control-error">
                        <i class="fa fa-exclamation-circle"></i>
                        <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
                    </div>
                </div>
            </div>
            <div class="form-group" [ngClass]=" toggleValidationFeedback('nombre') ? 'has-error' : ''">
                <label class="control-label col-sm-3" for="plantacionNombre">Nombre</label>
                <div class="col-sm-7 col-md-5">
                    <input type="text" class="form-control" placeholder="Nombre o alias" id="plantacionNombre" [(ngFormControl)]="ingresoPlantacion.controls['nombre']" />
                </div>
                <div class="col-sm-2 col-md-4">
                    <div class="form-control-static control-error">
                        <i class="fa fa-exclamation-circle"></i>
                        <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
                    </div>
                </div>
            </div>
            <div class="form-group" [ngClass]=" toggleValidationFeedback('producto') ? 'has-error' : ''">
                <label class="control-label col-sm-3" for="plantacionProducto">Producto</label>
                <div class="col-sm-7 col-md-5">
                    <select class="form-control" id="plantacionProducto"  [ngModel]="tipo" (ngModelChange)="objectToFormControl($event, 'productos', 'producto')">
                        <option *ngFor="#opcion of productos" [value]="opcion.id">{{ opcion.nombre }}</option>
                    </select>
                </div>
                <div class="col-sm-2 col-md-4">
                    <div class="form-control-static control-error">
                        <i class="fa fa-exclamation-circle"></i>
                        <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
                    </div>
                </div>
            </div>
            <div class="form-group" [ngClass]=" toggleValidationFeedback('tipo') ? 'has-error' : ''">
                <label class="control-label col-sm-3" for="plantacionTipo">Tipo de Producto</label>
                <div class="col-sm-7 col-md-5">
                    <select class="form-control" id="plantacionTipo" [ngModel]="tipo" (ngModelChange)="objectToFormControl($event, 'tiposProducto', 'tipo')">
                        <option *ngFor="#opcion of tiposProducto" [value]="opcion.id">{{ opcion.nombre }}</option>
                    </select>
                </div>
                <div class="col-sm-2 col-md-4">
                    <div class="form-control-static control-error">
                        <i class="fa fa-exclamation-circle"></i>
                        <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
                    </div>
                </div>
            </div>
            <div class="form-group" [ngClass]="toggleValidationFeedback('tamano') ? 'has-error' : ''">
                <label class="control-label col-sm-3" for="plantacionTamano">Tama&ntilde;o</label>
                <div class="col-sm-7 col-md-5">
                    <div class="input-group">
                        <input type="number" step="0.01" min="0" class="form-control" placeholder="Cantidad" id="plantacionTamano" [(ngFormControl)]="ingresoPlantacion.controls['tamano']" />
                        <div class="input-group-btn select-group">
                            <select class="form-control" id="plantacionUnidad"  [ngModel]="unidad" (ngModelChange)="objectToFormControl($event, 'unidades', 'unidad')" >
                                <option *ngFor="#opcion of unidades" [value]="opcion.id">{{ opcion.nombre }}</option>
                            </select>
                        </div>
                    </div>
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
                    <input type="submit" class="btn btn-primary" value="Crear Plantacion" [disabled]="!ingresoPlantacion.valid"/>
                </div>
            </div>
        </form>
    </div>`
})
export class IngresarPlantacionComponent {
    propietario : number;
    ingresoPlantacion : ControlGroup;
    tiposProducto : SimpleKey[] = [];
    productos : SimpleKey[] = [];
    unidades : SimpleKey[] = [];
    propietarios : EmpresaModel[] = [];

    constructor(public _formBuilder : FormBuilder,
                public _router : Router,
                public _routeParams : RouteParams,
                public _administracionService : AdministracionService, 
                public _opcionesService : OpcionesService) {}

    ngOnInit() {
        const pId = parseInt(this._routeParams.get("productor"));

        this._opcionesService.getProductosPlantacion().subscribe(productos => {
            this.productos = productos;
            this.propietario = !isNaN(pId) ?  pId : null;
            console.log(this.propietario);
        });

        this._opcionesService.getTiposProductoPlantacion().subscribe(tiposProducto => this.tiposProducto = tiposProducto);
        this._opcionesService.getUnidadesArea().subscribe(unidades => this.unidades = unidades);

        this._administracionService.getEmpresas(0).subscribe(productores => this.propietarios = productores);

        this.ingresoPlantacion = this._formBuilder.group({
            propietario : [null, Validators.required],
            nombre : [null, Validators.required],
            producto : [null, Validators.required],
            tipo : [null, Validators.required],
            tamano : [null, Validators.required],
            unidad : [null, Validators.required]
        });

        this.objectToFormControl(pId, "propietarios", "propietario");
    }
    
    submit() : void {
        if(this.ingresoPlantacion.valid) {
            const form = this.ingresoPlantacion.value;
            let plantacion = new PlantacionModel(null, form.propietario, form.nombre, form.producto, form.tipo, form.tamano, form.unidad);
            this._administracionService.postPlantacion(plantacion).subscribe(plantacion => {
                this._router.navigate(['VerPlantacion', { id  : plantacion.id }]);
            });
        }
        else {
            alert("Errores en el formulario")
        }
    }

    toggleValidationFeedback(control) : boolean {
        control = this.ingresoPlantacion.controls[control];
        return (!control.valid && control.touched);
    }

    objectToFormControl(id : any, collection : string, control : string) : void {
        const results = this[collection].filter((item : any) => item.id == id);

        this.ingresoPlantacion.controls[control].updateValue((results.length == 1) ? results[0] : null, {});
    }
}