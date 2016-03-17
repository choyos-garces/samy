import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, Control,ControlGroup, Validators} from "angular2/common";
import {Router} from "angular2/router";

import {ProductorModel} from "../../../Model/Administracion/ProductorModel";
import {ProductoresService} from "../../../Service/Administracion/ProductoresService";

@Component({
    selector : 'ingresar-productores',
    directives: [FORM_DIRECTIVES],
    template : `<div class="container-fluid">
        <h4>Crear Ficha de Productor</h4>
        <form [ngFormModel]="ingresarProductor" class="form-horizontal" (ngSubmit)="submit()" autocomplete="off" spellcheck="false">
            <div class="form-group" [ngClass]=" !toggleValidationFeedback('nombre') ? 'has-error' : ''">
                <label class="control-label col-sm-4 col-md-3" for="productorNombre">Nombre</label>
                <div class="col-sm-5 col-md-4">
                    <input type="text" class="form-control" name="nombre" placeholder="Nombre Completo" [(ngFormControl)]="ingresarProductor.controls['nombre']" id="productorNombre" />
                    <div class="checkbox form-group-sm">
                        <label class="text-muted">
                            <input type="checkbox" (change)="toggleInput(ingresarProductor.controls['flagRazon'], 'productorRazon')" [(ngFormControl)]="ingresarProductor.controls['flagRazon']"> Usar para Raz&oacute;n Social
                        </label>
                    </div>
                </div>
                <div class="col-sm-3 col-md-5">
                    <div class="form-control-static control-error">
                        <i class="fa fa-exclamation-circle"></i>
                        <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
                    </div>
                </div>
            </div>
            <div class="form-group" [ngClass]=" !toggleValidationFeedback('razon') ? 'has-error' : ''">
                <label class="control-label col-sm-4 col-md-3" for="productorRazon">Raz&oacute;n Social</label>
                <div class="col-sm-5 col-md-4">
                    <input type="text" class="form-control" ame="razon" placeholder="Nombre de la Empresa" [(ngFormControl)]="ingresarProductor.controls['razon']" id="productorRazon"/>
                </div>
                <div class="col-sm-3 col-md-5">
                    <div class="form-control-static control-error">
                        <i class="fa fa-exclamation-circle"></i>
                        <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
                    </div>
                </div>
            </div>
            <div class="form-group" [ngClass]=" !toggleValidationFeedback('numeroTelefono') ? 'has-error' : ''">
                <label class="control-label col-sm-4 col-md-3" for="productorNumeroTelefono">Numero Telef&oacute;nico</label>
                <div class="col-sm-5 col-md-4">
                    <input type="text" class="form-control" name="razon" placeholder="Convencional o Celular" [(ngFormControl)]="ingresarProductor.controls['numeroTelefono']" id="productorNumeroTelefono"/>
                </div>
                <div class="col-sm-3 col-md-5">
                    <div class="form-control-static control-error">
                        <i class="fa fa-exclamation-circle"></i>
                        <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
                    </div>
                </div>
            </div>
            <div class="form-group" [ngClass]=" !toggleValidationFeedback('identificacion') ? 'has-error' : ''">
                <label class="control-label col-sm-4 col-md-3" for="identificacion">Identificaci&oacute;n</label>
                <div class="col-sm-5 col-md-4">
                    <div class="input-group">
                        <div class="input-group-btn">
                            <select class="form-control" [ngFormControl]="ingresarProductor.controls['tipoIdentificacion']" >
                                <option *ngFor="#tipo of tiposIdentificaciones; #i = index" [value]="i">{{ tipo }}</option>
                            </select>
                        </div>
                        <input type="text" class="form-control" name="identificacion" placeholder="Numero de Identificac&oacute;n" [ngFormControl]="ingresarProductor.controls['identificacion']" id="identificacion"/>
                    </div>
                </div>
                <div class="col-sm-3 col-md-5">
                    <div class="form-control-static control-error">
                        <i class="fa fa-exclamation-circle"></i>
                        <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
                    </div>
                </div>
            </div>
            <div class="form-group" [ngClass]=" !toggleValidationFeedback('correoContacto') ? 'has-error' : ''">
                <label class="control-label col-sm-4 col-md-3" for="productorCorreoContacto">Correro Contacto</label>
                <div class="col-sm-5 col-md-4">
                    <input type="email" class="form-control" name="correoContacto" placeholder="Correo Personal" [ngFormControl]="ingresarProductor.controls['correoContacto']" id="productorCorreoContacto" />
                    <div class="checkbox form-group-sm">
                        <label class="text-muted">
                            <input type="checkbox" (change)="toggleInput(ingresarProductor.controls['flagCorreo'], 'productorCorreoNotificaciones')" [(ngFormControl)]="ingresarProductor.controls['flagCorreo']"> Usar Para Notificaciones
                        </label>
                    </div>
                </div>
                <div class="col-sm-3 col-md-5">
                    <div class="form-control-static control-error">
                        <i class="fa fa-exclamation-circle"></i>
                        <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
                    </div>
                </div>
            </div>
            <div class="form-group" [ngClass]=" !toggleValidationFeedback('correoNotificaciones') ? 'has-error' : ''">
                <label class="control-label col-sm-4 col-md-3" for="productorCorreoNotificaciones">Correo Notificaciones</label>
                <div class="col-sm-5 col-md-4">
                    <input type="email" class="form-control" name="correoNotificaciones" placeholder="Notificaciones Automaticas" [ngFormControl]="ingresarProductor.controls['correoNotificaciones']" id="productorCorreoNotificaciones" />
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
                    <input type="submit" class="btn btn-primary" value="Crear Productor" [disabled]="!ingresarProductor.valid"/>
                </div>
            </div>
        </form>
    </div>`
})
export class IngresarProductorComponent {
    public tiposIdentificaciones : Array<string>;
    public ingresarProductor : ControlGroup;
    public url : string;

    constructor(public _productoresService : ProductoresService, public _formBuilder : FormBuilder, public _router : Router) {
        this.tiposIdentificaciones = this._productoresService.getTiposIdentificacion();

        this.ingresarProductor = _formBuilder.group({
            nombre: [null, Validators.required],
            razon: [null, Validators.required],
            numeroTelefono: [null, Validators.required],
            tipoIdentificacion: [0],
            identificacion: [null, Validators.required],
            correoContacto: [null, Validators.required],
            correoNotificaciones: [null, Validators.required],
            flagCorreo: [false],
            flagRazon: [false]
        });

        this.ingresarProductor.controls["flagCorreo"].valueChanges.subscribe((flag) => {
            this.ingresarProductor.controls["correoNotificaciones"] = (flag) ? new Control(null) : new Control(null, Validators.required);
            this.ingresarProductor.updateValueAndValidity({});
        });

        this.ingresarProductor.controls["flagRazon"].valueChanges.subscribe((flag) => {
            this.ingresarProductor.controls["razon"] = (flag) ? new Control(null) : new Control(null, Validators.required);
            this.ingresarProductor.updateValueAndValidity({});
        });
    }

    submit() : void {
        if(this.ingresarProductor.valid) {
            const form = this.ingresarProductor.value;
            let productor = new ProductorModel(form, form.flagRazon, form.flagCorreo);
            productor.fechaIngreso = new Date();

            productor = this._productoresService.push(productor);
            this._router.navigate(['VerProductor', { id : productor.id }]);
        }
        else {
            alert("Errores en el formulario")
        }
    }

    toggleInput(flag : Control, target : string ) : void {
        let ele = <HTMLInputElement> document.getElementById(target);
        ele.disabled = !flag.value ;
    }

    toggleValidationFeedback(control) : boolean {
        control = this.ingresarProductor.controls[control];
        return !(!control.valid && control.touched);

    }
}