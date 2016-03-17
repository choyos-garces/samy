import {Component} from "angular2/core";
import {Router, ROUTER_DIRECTIVES} from "angular2/router";
import {FormBuilder, Validators, ControlGroup} from "angular2/common";

import {ProveedoresService} from "../../../Service/Administracion/ProveedoresService";
import {ProveedorModel} from "../../../Model/Administracion/ProveedorModel";

@Component({
    selector: 'ingresar-proveedor',
    directives : [ROUTER_DIRECTIVES],
    template : `<div class="container-fluid">
    <h4>Crear Ficha del Proveedor</h4>
    <form class="form-horizontal" [ngFormModel]="ingresarProveedor" (ngSubmit)="submit()" autocomplete="off" spellcheck="false">
            <div class="form-group" [ngClass]="!toggleValidationFeedback('razonSocial') ? 'has-error' : ''">
                <label class="control-label col-sm-4 col-md-3" for="proveedorRazonSocial">Raz&oacute;n Social</label>
                <div class="col-sm-5 col-md-4">
                    <input type="text" id="proveedorRazonSocial" class="form-control" placeholder="Nombre para la factura" [ngFormControl]="ingresarProveedor.controls['razonSocial']" />
                </div>
                <div class="col-sm-3 col-md-5">
                    <div class="form-control-static control-error">
                        <i class="fa fa-exclamation-circle"></i>
                        <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
                    </div>
                </div>
            </div>
            <div class="form-group" [ngClass]=" !toggleValidationFeedback('identificacion') ? 'has-error' : ''">
                <label class="control-label col-sm-4 col-md-3" for="proveedorIdentificacion">Identificaci&oacute;n</label>
                <div class="col-sm-5 col-md-4">
                    <div class="input-group">
                    <div class="input-group-btn">
                        <select class="form-control" [ngFormControl]="ingresarProveedor.controls['tipoIdentificacion']">
                            <option *ngFor="#tipo of tiposIdentificacion; #i = index" [value]="i">{{ tipo }}</option>
                        </select>
                    </div>
                    <input type="text" id="proveedorIdentificacion" class="form-control" placeholder="C&eacute;dula o R.U.C." [ngFormControl]="ingresarProveedor.controls['identificacion']" />
                    </div>

                </div>
                <div class="col-sm-3 col-md-5">
                    <div class="form-control-static control-error">
                        <i class="fa fa-exclamation-circle"></i>
                        <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
                    </div>
                </div>
            </div>
            <div class="form-group" [ngClass]="!toggleValidationFeedback('numeroTelefono') ? 'has-error' : ''">
                <label class="control-label col-sm-4 col-md-3" for="proveedorNumeroTelefono">N&uacute;mero Telef&oacute;nico</label>
                <div class="col-sm-5 col-md-4">
                    <input type="text" id="proveedorNumeroTelefono" class="form-control" placeholder="Convencional" [ngFormControl]="ingresarProveedor.controls['numeroTelefono']" />
                </div>
                <div class="col-sm-3 col-md-5">
                    <div class="form-control-static control-error">
                        <i class="fa fa-exclamation-circle"></i>
                        <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
                    </div>
                </div>
            </div>
            <div class="form-group" [ngClass]="!toggleValidationFeedback('correo') ? 'has-error' : ''">
                <label class="control-label col-sm-4 col-md-3" for="proveedorCorreo">Correo</label>
                <div class="col-sm-5 col-md-4">
                    <input type="email" id="proveedorCorreo" class="form-control" placeholder="Correo para facturaci&oacute;n electronica" [ngFormControl]="ingresarProveedor.controls['correo']" />
                </div>
                <div class="col-sm-3 col-md-5">
                    <div class="form-control-static control-error">
                        <i class="fa fa-exclamation-circle"></i>
                        <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
                    </div>
                </div>
            </div>
            <div class="form-group" [ngClass]="!toggleValidationFeedback('direccion') ? 'has-error' : ''">
                <label class="control-label col-sm-4 col-md-3" for="proveedorDireccion">Direcci&oacute;n</label>
                <div class="col-sm-5 col-md-4">
                    <textarea id="proveedorDireccion" class="form-control" [ngFormControl]="ingresarProveedor.controls['direccion']"></textarea>
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
                    <input type="submit" class="btn btn-primary" value="Crear Proveedor" [disabled]="!ingresarProveedor.valid"/>
                </div>
            </div>
    </form>
    </div>`
})
export class IngresarProveedorComponent {
    ingresarProveedor : ControlGroup;
    tiposIdentificacion : Array<string>;

    constructor(public _router : Router,
                public _formBuilder : FormBuilder,
                public _proveedoresService : ProveedoresService) {

        this.ingresarProveedor = this._formBuilder.group({
            razonSocial : [null, Validators.required],
            tipoIdentificacion : [0],
            identificacion : [null, Validators.required],
            numeroTelefono : [null, Validators.required],
            correo : [null, Validators.required],
            direccion : [null, Validators.required]
        });

        this.tiposIdentificacion = this._proveedoresService.getTiposIdentificaciones();

    }
    
    toggleValidationFeedback(control) : boolean {
        control = this.ingresarProveedor.controls[control];
        return !(!control.valid && control.touched);

    }
    
    submit() {
        if(this.ingresarProveedor.valid) {
            const form = this.ingresarProveedor.value;
            let proveedor = new ProveedorModel(null, form.razonSocial, form.tipoIdentificacion, form.identificacion, form.numeroTelefono, form.direccion, form.correo)
            proveedor = this._proveedoresService.push(proveedor);

            this._router.navigate(["VerProveedor", { id : proveedor.id }])
        }
        else {
            console.log("Error en el Formulario")
        }
    }
}