import {Component, Output, EventEmitter} from "angular2/core";
import {ControlGroup, FormBuilder, Validators} from "angular2/common";

import {ProveedorModel} from "../../../../Model/Administracion/ProveedorModel";
import {ProveedoresService} from "../../../../Service/Administracion/ProveedoresService";

@Component({
    selector : 'ingreso-proveedor',
    template : `
    <div class="form-group" [ngClass]=" !toggleValidationFeedback('proveedor') ? 'has-error' : ''">
        <label class="control-label col-sm-4 col-md-3" for="IngresoInventaroProveedor">Proveedor</label>
        <div class="col-sm-5 col-md-4">
            <select class="form-control" id="IngresoInventaroProveedor" [(ngFormControl)]="ingresoInventarioProveedor.controls['proveedor']" >
                <option *ngFor="#proveedor of proveedores" [value]="proveedor.id">{{ proveedor.razonSocial }}</option>
            </select>
        </div>
        <div class="col-sm-3 col-md-5">
            <div class="form-control-static control-error">
                <i class="fa fa-exclamation-circle"></i>
                <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
            </div>
        </div>
    </div>
    <div class="form-group" [ngClass]=" !toggleValidationFeedback('factura') ? 'has-error' : ''">
        <label class="control-label col-sm-4 col-md-3" for="IngresoInventaroProveedorFactura">Factura</label>
        <div class="col-sm-5 col-md-4">
            <input type="text" class="form-control" id="IngresoInventaroProveedorFactura" [(ngFormControl)]="ingresoInventarioProveedor.controls['factura']" />
        </div>
        <div class="col-sm-3 col-md-5">
            <div class="form-control-static control-error">
                <i class="fa fa-exclamation-circle"></i>
                <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
            </div>
        </div>
    </div>
    <div class="form-group" [ngClass]=" !toggleValidationFeedback('precio') ? 'has-error' : ''">
        <label class="control-label col-sm-4 col-md-3" for="IngresoInventaroProveedorPrecio">Precio</label>
        <div class="col-sm-5 col-md-4">
            <input type="number" step="0.01" placeholder="Precio Unitario" class="form-control" id="IngresoInventaroProveedorPrecio" [(ngFormControl)]="ingresoInventarioProveedor.controls['precio']" />
            <div class="checkbox form-group-sm">
                <label class="text-muted">
                    <input type="checkbox" [(ngFormControl)]="ingresoInventarioProveedor.controls['iva']"> El producto tiene I.V.A.?
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
    `
})
export class IngresarInventarioProveedorComponent {
    @Output() submitForm = new EventEmitter();

    ingresoInventarioProveedor : ControlGroup;
    proveedores : Array<ProveedorModel>;

    constructor(public _formBuilder : FormBuilder,
                public _proveedoresService : ProveedoresService) {
        this.ingresoInventarioProveedor = this._formBuilder.group({
            form : ["proveedor"],
            proveedor : [1 , Validators.required],
            factura : [null, Validators.required],
            precio : [null, Validators.required],
            iva : [true, Validators.required]
        });

        this.proveedores = this._proveedoresService.getProveedores();

        this.ingresoInventarioProveedor.valueChanges.subscribe(() => {
            this.submitForm.emit(this.ingresoInventarioProveedor);
        })
    }

    toggleValidationFeedback(control) : boolean {
        control = this.ingresoInventarioProveedor.controls[control];
        return !(!control.valid && control.touched);
    }

    ngOnInit() {
        this.submitForm.emit(this.ingresoInventarioProveedor);
    }
}