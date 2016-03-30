import {Component, Output, EventEmitter} from "angular2/core";
import {ControlGroup, FormBuilder, Validators, Control} from "angular2/common";
import {EmpresaModel} from "../../../../Administracion/Models/EmpresaModel";
import {AdministracionService} from "../../../../Administracion/Services/AdministracionService";

@Component({
    selector : 'motivo-ingreso-proveedor',
    template : `
    <div class="form-group" [ngClass]=" !toggleValidationFeedback('proveedor') ? 'has-error' : ''">
        <label class="control-label col-sm-3" for="motivoIngresoProveedorProveedor">Proveedor</label>
        <div class="col-sm-7 col-md-5">
            <select class="form-control" id="motivoIngresoProveedorProveedor" [ngModel]="proveedor" (ngModelChange)=" objectToFormControl($event, 'proveedores', 'proveedor')">
                <option *ngFor="#opcion of proveedores" [value]="opcion.id">{{ opcion.razonSocial }}</option>
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

    ngOnInit() {
        this._administracionService.getEmpresas(1).subscribe(proveedores => this.proveedores = proveedores);
        
        this.motivoIngresoProveedor = this._formBuilder.group({
            proveedor : [null , Validators.required],
            factura : [null, Validators.required]
        });

        this.motivoIngresoProveedor.valueChanges.subscribe(() => this.emitirValores());
    }

    emitirValores() : void {
        if(this.motivoIngresoProveedor.valid) {
            const opciones = {
                proveedor : <EmpresaModel> this.motivoIngresoProveedor.value.proveedor,
                factura : <string> this.motivoIngresoProveedor.value.factura
            };
            return this.valuesChange.emit(opciones);
        }
        else
            return this.valuesChange.emit(null);
    }
    
    toggleValidationFeedback(control) : boolean {
        control = this.motivoIngresoProveedor.controls[control];
        return !(!control.valid && control.touched);
    }

    objectToFormControl(id, collection : string, control : string) : void {
        const result = this[collection].filter((item : any) => item.id == id);

        (<Control>this.motivoIngresoProveedor.controls[control]).updateValue((result.length == 1) ? result[0] : null);
    }
}