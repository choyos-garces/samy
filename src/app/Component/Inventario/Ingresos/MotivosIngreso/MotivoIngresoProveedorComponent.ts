import {Component, Output, EventEmitter} from "angular2/core";
import {ControlGroup, FormBuilder, Validators, Control} from "angular2/common";

import {ProveedorModel} from "../../../../Model/Administracion/ProveedorModel";
import {ProveedoresService} from "../../../../Service/Administracion/ProveedoresService";

@Component({
    selector : 'motivo-ingreso-proveedor',
    template : `
    <div class="form-group" [ngClass]=" !toggleValidationFeedback('proveedor') ? 'has-error' : ''">
        <label class="control-label col-sm-3" for="motivoIngresoProveedorProveedor">Proveedor</label>
        <div class="col-sm-7 col-md-5">
            <select class="form-control" id="motivoIngresoProveedorProveedor" [ngModel]="proveedor" (ngModelChange)="assignarFormControl($event, 'proveedores', 'proveedor')">
                <option *ngFor="#proveedor of proveedores;#i = index" [value]="i">{{ proveedor.razonSocial }}</option>
            </select>
        </div>
        <div class="col-sm-2 col-md-4">
            <div class="form-control-static control-error">
                <i class="fa fa-exclamation-circle"></i>
                <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
            </div>
        </div>
    </div>
    <div class="form-group" [ngClass]=" !toggleValidationFeedback('factura') ? 'has-error' : ''">
        <label class="control-label col-sm-3" for="motivoIngresoProveedorFactura">Factura</label>
        <div class="col-sm-7 col-md-5">
            <input type="tel" class="form-control" id="motivoIngresoProveedorFactura" [(ngFormControl)]="motivoIngresoProveedor.controls['factura']" />
        </div>
        <div class="col-sm-2 col-md-4">
            <div class="form-control-static control-error">
                <i class="fa fa-exclamation-circle"></i>
                <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
            </div>
        </div>
    </div>
    <div class="form-group" [ngClass]=" !toggleValidationFeedback('precio') ? 'has-error' : ''">
        <label class="control-label col-sm-3" for="motivoIngresoProveedorPrecio">Precio</label>
        <div class="col-sm-7 col-md-5">
            <input type="number" step="0.01" placeholder="Precio Unitario" class="form-control" id="motivoIngresoProveedorPrecio" [(ngFormControl)]="motivoIngresoProveedor.controls['precio']" />
            <div class="checkbox form-group-sm">
                <label class="text-muted">
                    <input type="checkbox" [(ngFormControl)]="motivoIngresoProveedor.controls['iva']"> El producto tiene I.V.A.?
                </label>
            </div>
        </div>
        <div class="col-sm-2 col-md-4">
            <div class="form-control-static control-error">
                <i class="fa fa-exclamation-circle"></i>
                <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
            </div>
        </div>
    </div>`
})
export class MotivoIngresoProveedorComponent {
    @Output() valuesChange = new EventEmitter();

    motivoIngresoProveedor : ControlGroup;
    proveedores : Array<ProveedorModel>;

    constructor(public _formBuilder : FormBuilder,
                public _proveedoresService : ProveedoresService) {
        this.motivoIngresoProveedor = this._formBuilder.group({
            proveedor : [1 , Validators.required],
            factura : [null, Validators.required],
            precio : [null, Validators.required],
            iva : [true, Validators.required]
        });

        this.proveedores = this._proveedoresService.getProveedores();

        this.motivoIngresoProveedor.valueChanges.subscribe(() => {
            this.valuesChange.emit(this.motivoIngresoProveedor);
        })
    }

    toggleValidationFeedback(control) : boolean {
        control = this.motivoIngresoProveedor.controls[control];
        return !(!control.valid && control.touched);
    }

    assignarFormControl(index, collection, control) : void {
        this.motivoIngresoProveedor.controls[control] = new Control(this[collection][index], null);
    }

    ngOnInit() {
        this.valuesChange.emit(this.motivoIngresoProveedor);
    }
}