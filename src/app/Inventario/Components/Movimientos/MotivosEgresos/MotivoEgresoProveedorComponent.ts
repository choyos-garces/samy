import {Component, Output, EventEmitter} from "angular2/core";
import {ControlGroup, FormBuilder, Validators, Control} from "angular2/common";
import {EmpresaModel} from "../../../../Administracion/Models/EmpresaModel";
import {AdministracionService} from "../../../../Administracion/Services/AdministracionService";


@Component({
    selector : "motivo-egreso-proveedor",
    template : `
    <div class="form-group" [ngClass]=" !toggleValidationFeedback('proveedor') ? 'has-error' : ''">
        <label class="control-label col-sm-3" for="motivoEgresoProveedorProveedor">Proveedor</label>
        <div class="col-sm-7 col-md-5">
            <select class="form-control" id="motivoEgresoProveedorProveedor" [ngModel]="proveedor" (ngModelChange)="assignarFormControl($event, 'proveedores', 'proveedor')">
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
    proveedores : EmpresaModel[];

    constructor(public _formBuilder : FormBuilder,
                public _administracionService : AdministracionService) {
        this.motivoEgresoProveedor = this._formBuilder.group({
            proveedor : [1, Validators.required],
            notas : [null, Validators.required]
        });

        this.motivoEgresoProveedor.valueChanges.subscribe(() => {
            this.valuesChange.emit(this.motivoEgresoProveedor);
        })
    }

    toggleValidationFeedback(control) {
        control = this.motivoEgresoProveedor.controls[control];
        return !(!control.valid && control.touched);
    }

    assignarFormControl(index, collection, control) : void {
        (<Control>this.motivoEgresoProveedor.controls[control]).updateValue(this[collection][index], {});
    }
    
    ngOnInit() {
        this.valuesChange.emit(this.motivoEgresoProveedor);
        this._administracionService.getEmpresas(1).subscribe(empresas => this.proveedores = empresas);
    }
}