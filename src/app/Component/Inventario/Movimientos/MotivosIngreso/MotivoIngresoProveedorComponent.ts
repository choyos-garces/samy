import {Component, Output, EventEmitter} from "angular2/core";
import {ControlGroup, FormBuilder, Validators, Control} from "angular2/common";
import {EmpresaModel} from "../../../../Model/Administracion/EmpresaModel";
import {AdministracionService} from "../../../../Service/AdministracionService";

@Component({
    selector : 'motivo-ingreso-proveedor',
    template : `
    <div class="form-group" [ngClass]=" !toggleValidationFeedback('proveedor') ? 'has-error' : ''">
        <label class="control-label col-sm-3" for="motivoIngresoProveedorProveedor">Proveedor</label>
        <div class="col-sm-7 col-md-5">
            <select class="form-control" id="motivoIngresoProveedorProveedor" [ngModel]="proveedor" (ngModelChange)="assignarFormControl($event, 'proveedores', 'proveedor')">
                <option *ngFor="#proveedor of proveedores;#i = index" [value]="i">{{ proveedor.razon_social }}</option>
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
    </div>`
})
export class MotivoIngresoProveedorComponent {
    @Output() valuesChange = new EventEmitter();

    motivoIngresoProveedor : ControlGroup;
    proveedores : EmpresaModel[];

    constructor(public _formBuilder : FormBuilder,
                public _administracionService : AdministracionService) {}

    toggleValidationFeedback(control) : boolean {
        control = this.motivoIngresoProveedor.controls[control];
        return !(!control.valid && control.touched);
    }

    assignarFormControl(index, collection, control) : void {
        this.motivoIngresoProveedor.controls[control] = new Control(this[collection][index], null);
    }

    ngOnInit() {
        this.motivoIngresoProveedor = this._formBuilder.group({
            proveedor : [1 , Validators.required],
            factura : [null, Validators.required]
        });

        this._administracionService.getEmpresas(1).subscribe(proveedores => this.proveedores = proveedores);

        this.motivoIngresoProveedor.valueChanges.subscribe(() => {
            this.valuesChange.emit(this.motivoIngresoProveedor);
        });
    }
}