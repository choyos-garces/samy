import {Component, Input, Output, EventEmitter} from "angular2/core";
import {ControlGroup, FormBuilder, Validators, Control} from "angular2/common";
import {OpcionesService} from "../../../ControlPanel/Services/OpcionesService";
import {SimpleKey} from "../../../ControlPanel/Models/SimpleKey";
import {EmpresaModel} from "../../Models/EmpresaModel";

@Component({
    selector : 'ingreso-empresa',
    template : `
    <div class="form-group" [ngClass]="toggleValidationFeedback('razon') ? 'has-error' : ''">
        <label class="control-label col-sm-3" for="empresaRazon">Raz&oacute;n Social</label>
        <div class="col-sm-7 col-md-5">
            <input type="text" class="form-control" placeholder="Nombre de la Empresa" [(ngFormControl)]="datosEmpresa.controls['razon']" id="empresaRazon"/>
        </div>
        <div class="col-sm-2 col-md-4">
            <div class="form-control-static control-error">
                <i class="fa fa-exclamation-circle"></i>
                <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
            </div>
        </div>
    </div>
    <div class="form-group" [ngClass]="(toggleValidationFeedback('identificacion') || toggleValidationFeedback('tipoIdentificacion')) ? 'has-error' : ''">
        <label class="control-label col-sm-3" for="empresaIdentificacion">Identificaci&oacute;n</label>
        <div class="col-sm-7 col-md-5">
            <div class="input-group">
                <div class="input-group-btn select-group">
                    <select class="form-control" [ngModel]="tipoIdentificacion" (ngModelChange)="objectToFormControl($event, 'tiposIdentificaciones', 'tipoIdentificacion')">
                        <option *ngFor="#tipo of tiposIdentificaciones" [value]="tipo.id">{{ tipo.nombre }}</option>
                    </select>
                </div>
                <input type="tel" class="form-control" placeholder="C&eacute;dula o R.U.C." [ngFormControl]="datosEmpresa.controls['identificacion']" id="empresaIdentificacion"/>
            </div>
        </div>
        <div class="col-sm-2 col-md-4">
            <div class="form-control-static control-error">
                <i class="fa fa-exclamation-circle"></i>
                <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
            </div>
        </div>
    </div>
    <div class="form-group" [ngClass]="toggleValidationFeedback('telefono') ? 'has-error' : ''">
        <label class="control-label col-sm-3" for="empresaTelefono">Tel&eacute;fono</label>
        <div class="col-sm-7 col-md-5">
            <input type="tel" class="form-control" placeholder="Convencional/Oficina" [(ngFormControl)]="datosEmpresa.controls['telefono']" id="empresaTelefono"/>
        </div>
        <div class="col-sm-2 col-md-4">
            <div class="form-control-static control-error">
                <i class="fa fa-exclamation-circle"></i>
                <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
            </div>
        </div>
    </div>
    <div class="form-group" [ngClass]="toggleValidationFeedback('correo') ? 'has-error' : ''">
        <label class="control-label col-sm-3" for="empresaCorreo">Correro</label>
        <div class="col-sm-7 col-md-5">
            <input type="email" class="form-control" placeholder="Correo para notificaciones/facturas" [ngFormControl]="datosEmpresa.controls['correo']" id="empresaCorreo" />
        </div>
        <div class="col-sm-2 col-md-4">
            <div class="form-control-static control-error">
                <i class="fa fa-exclamation-circle"></i>
                <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
            </div>
        </div>
    </div>
    <div class="form-group" [ngClass]="toggleValidationFeedback('direccion') ? 'has-error' : ''">
        <label class="control-label col-sm-3" for="empresaCorreo">Direcci&oacute;n</label>
        <div class="col-sm-7 col-md-5">
            <textarea class="form-control" [ngFormControl]="datosEmpresa.controls['direccion']" id="empresaDireccion"></textarea>
        </div>
        <div class="col-sm-2 col-md-4">
            <div class="form-control-static control-error">
                <i class="fa fa-exclamation-circle"></i>
                <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
            </div>
        </div>
    </div>`
})
export class IngresoEmpresaComponent {
    @Input() tipoEmpresa;
    @Output() onChange = new EventEmitter();
    
    datosEmpresa : ControlGroup;
    tiposIdentificaciones : SimpleKey[] = [];
    
    constructor(public _opcionesService : OpcionesService, 
                public _formBuilder : FormBuilder) {}
    
    ngOnInit() {
        this._opcionesService.getTiposIdentificacion().subscribe(tiposIdentificacion => this.tiposIdentificaciones = tiposIdentificacion);

        this.datosEmpresa = this._formBuilder.group({
            tipoEmpresa : [this.tipoEmpresa, Validators.required],
            razon: [null, Validators.required],
            tipoIdentificacion: [null, Validators.required],
            identificacion: [null, Validators.required],
            telefono: [null, Validators.required],
            correo: [null, Validators.required],
            direccion : [null, Validators.required]
        });

        this.datosEmpresa.valueChanges.subscribe(() => {
            if(this.datosEmpresa.valid) {
                var values = this.datosEmpresa.value;
                var empresa = new EmpresaModel(null, values.razon, values.identificacion, values.tipoIdentificacion, values.telefono, values.correo, values.direccion, values.tipoEmpresa);
                this.onChange.emit(empresa);
            }
            else {
                this.onChange.emit(null);
            }
        });
    }

    toggleValidationFeedback(control) : boolean {
        control = this.datosEmpresa.controls[control];
        return (!control.valid && control.touched);
    }

    objectToFormControl(id, collection : string, control : string) : void {
        const result = this[collection].filter((item : any) => item.id == id);

        (<Control>this.datosEmpresa.controls[control]).updateValue((result.length == 1) ? result[0] : null,{});
    }
}