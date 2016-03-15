import {Component} from 'angular2/core';
import {FORM_DIRECTIVES, FormBuilder, Control,ControlGroup, Validators} from "angular2/common";
import {Router} from "angular2/router";

import {ClienteModel} from "../../../Model/Recursos/ClienteModel";
import {ClienteService} from "../../../Service/Recursos/ClientesService";

@Component({
    selector : 'ingresar-clientes',
    directives: [FORM_DIRECTIVES],
    template : `<div class="container-fluid">
        <h4>Crear Ficha de Cliente</h4>
        <form [ngFormModel]="ingresoCliente" class="form-horizontal" (ngSubmit)="submit()" autocomplete="off" spellcheck="false">
            <div class="form-group" [ngClass]=" !toggleValidationFeedback('nombre') ? 'has-error' : ''">
                <label class="control-label col-sm-4 col-md-3" for="clienteNombre">Nombre</label>
                <div class="col-sm-5 col-md-4">
                    <input type="text" class="form-control" name="nombre" placeholder="Nombre Completo" [(ngFormControl)]="ingresoCliente.controls['nombre']" id="clienteNombre" />
                    <div class="checkbox form-group-sm">
                        <label class="text-muted">
                            <input type="checkbox" (change)="toggleInput(ingresoCliente.controls['flagRazon'], 'clienteRazon')" [(ngFormControl)]="ingresoCliente.controls['flagRazon']"> Usar para Raz&oacute;n Social
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
                <label class="control-label col-sm-4 col-md-3" for="clienteRazon">Raz&oacute;n Social</label>
                <div class="col-sm-5 col-md-4">
                    <input type="text" class="form-control" ame="razon" placeholder="Nombre de la Empresa" [(ngFormControl)]="ingresoCliente.controls['razon']" id="clienteRazon"/>
                </div>
                <div class="col-sm-3 col-md-5">
                    <div class="form-control-static control-error">
                        <i class="fa fa-exclamation-circle"></i>
                        <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
                    </div>
                </div>
            </div>
            <div class="form-group" [ngClass]=" !toggleValidationFeedback('numeroTelefono') ? 'has-error' : ''">
                <label class="control-label col-sm-4 col-md-3" for="clienteNumeroTelefono">Numero Telef&oacute;nico</label>
                <div class="col-sm-5 col-md-4">
                    <input type="text" class="form-control" name="razon" placeholder="Convencional o Celular" [(ngFormControl)]="ingresoCliente.controls['numeroTelefono']" id="clienteNumeroTelefono"/>
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
                            <select class="form-control" [ngFormControl]="ingresoCliente.controls['tipoIdentificacion']" >
                                <option *ngFor="#tipo of tiposIdentificaciones; #i = index" [value]="i">{{ tipo }}</option>
                            </select>
                        </div>
                        <input type="text" class="form-control" name="identificacion" placeholder="Numero de Identificac&oacute;n" [ngFormControl]="ingresoCliente.controls['identificacion']" id="identificacion"/>
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
                <label class="control-label col-sm-4 col-md-3" for="clienteCorreoContacto">Correro Contacto</label>
                <div class="col-sm-5 col-md-4">
                    <input type="email" class="form-control" name="correoContacto" placeholder="Correo Personal" [ngFormControl]="ingresoCliente.controls['correoContacto']" id="clienteCorreoContacto" />
                    <div class="checkbox form-group-sm">
                        <label class="text-muted">
                            <input type="checkbox" (change)="toggleInput(ingresoCliente.controls['flagCorreo'], 'clienteCorreoNotificaciones')" [(ngFormControl)]="ingresoCliente.controls['flagCorreo']"> Usar Para Notificaciones
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
                <label class="control-label col-sm-4 col-md-3" for="clienteCorreoNotificaciones">Correo Notificaciones</label>
                <div class="col-sm-5 col-md-4">
                    <input type="email" class="form-control" name="correoNotificaciones" placeholder="Notificaciones Automaticas" [ngFormControl]="ingresoCliente.controls['correoNotificaciones']" id="clienteCorreoNotificaciones" />
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
                    <input type="submit" class="btn btn-primary" value="Crear Cliente" [disabled]="!ingresoCliente.valid"/>
                </div>
            </div>
        </form>
    </div>`
})
export class IngresarClientesComponent {
    public tiposIdentificaciones : Array<string>;
    public ingresoCliente : ControlGroup;
    public url : string;

    constructor(public _clientesService : ClienteService, public _formBuilder : FormBuilder, public _router : Router) {
        this.tiposIdentificaciones = this._clientesService.getTiposIdentificaciones();

        this.ingresoCliente = _formBuilder.group({
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

        this.ingresoCliente.controls["flagCorreo"].valueChanges.subscribe((flag) => {
            this.ingresoCliente.controls["correoNotificaciones"] = (flag) ? new Control(null) : new Control(null, Validators.required);
            this.ingresoCliente.updateValueAndValidity({});
        });

        this.ingresoCliente.controls["flagRazon"].valueChanges.subscribe((flag) => {
            this.ingresoCliente.controls["razon"] = (flag) ? new Control(null) : new Control(null, Validators.required);
            this.ingresoCliente.updateValueAndValidity({});
        });
    }

    submit() : void {
        if(this.ingresoCliente.valid) {
            const form = this.ingresoCliente.value;
            let cliente = new ClienteModel(form, form.flagRazon, form.flagCorreo);
            cliente.fechaIngreso = new Date();

            cliente = this._clientesService.push(cliente);
            this._router.navigate(['VerCliente', { id : cliente.id }]);
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
        control = this.ingresoCliente.controls[control];
        return !(!control.valid && control.touched);

    }
}