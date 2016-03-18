import {Component, Output, EventEmitter} from "angular2/core";
import {ControlGroup, FormBuilder, Validators} from "angular2/common";
import {ProveedorModel} from "../../../../Model/Administracion/ProveedorModel";
import {ProveedoresService} from "../../../../Service/Administracion/ProveedoresService";

@Component({
    selector : "motivo-egreso-proveedor",
    template : `
    <div class="form-group" [ngClass]=" !toggleValidationFeedback('proveedor') ? 'has-error' : ''">
        <label class="control-label col-sm-3" for="motivoEgresoProveedorProveedor">Proveedor</label>
        <div class="col-sm-7 col-md-5">
            <select class="form-control" id="motivoEgresoProveedorProveedor" [(ngFormControl)]="motivoEgresoProveedor.controls['proveedor']" >
                <option *ngFor="#proveedor of proveedores" [value]="proveedor.id">{{ proveedor.razonSocial }}</option>
            </select>
        </div>
        <div class="col-sm-2 col-md-4">
            <div class="form-control-static control-error">
                <i class="fa fa-exclamation-circle"></i>
                <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
            </div>
        </div>
    </div>
    <div class="form-group" [ngClass]=" !toggleValidationFeedback('notas') ? 'has-error' : ''">
        <label class="control-label col-sm-3" for="motivoEgresoProveedorNotas">Notas</label>
        <div class="col-sm-7 col-md-5">
            <textarea class="form-control" id="motivoEgresoProveedorNotas" [(ngFormControl)]="motivoEgresoProveedor.controls['notas']" ></textarea>
        </div>
        <div class="col-sm-2 col-md-4">
            <div class="form-control-static control-error">
                <i class="fa fa-exclamation-circle"></i>
                <span class="visible-xs-inline">Datos incompletos o no permitidos</span>
            </div>
        </div>
    </div>`
})
export class MotivoEgresoProveedorComponent {
    @Output() valuesChange = new EventEmitter();
    
    motivoEgresoProveedor : ControlGroup;
    proveedores : Array<ProveedorModel>;

    constructor(public _formBuilder : FormBuilder,
                public _proveedoresService : ProveedoresService) {
        this.motivoEgresoProveedor = this._formBuilder.group({
            proveedor : [1, Validators.required],
            notas : [null, Validators.required]
        });

        this.proveedores = this._proveedoresService.getProveedores();

        this.motivoEgresoProveedor.valueChanges.subscribe(() => {
            this.valuesChange.emit(this.motivoEgresoProveedor);
        })
    }

    toggleValidationFeedback(control) {
        control = this.motivoEgresoProveedor.controls[control];
        return !(!control.valid && control.touched);
    }

    ngOnInit() {
        this.valuesChange.emit(this.motivoEgresoProveedor);
    }
}