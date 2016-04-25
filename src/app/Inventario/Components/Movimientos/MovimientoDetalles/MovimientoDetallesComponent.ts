import {Component, Input, Output, EventEmitter} from "angular2/core";
import {FormBuilder, Validators} from "angular2/common";

import {FormController} from "../../../../App/FormController";
import {FormLabelComponent} from "../../../../App/Components/Forms/FormLabelComponent";
import {FormFeedbackComponent} from "../../../../App/Components/Forms/FormFeedbackComponent";

import {NotifyService} from "../../../../Notify/Services/NotifyService";
import {BodegaModel} from "../../../../Administracion/Models/BodegaModel";
import {EmpresaModel} from "../../../../Administracion/Models/EmpresaModel";
import {PlantacionModel} from "../../../../Administracion/Models/PlantacionModel";
import {SimpleKey} from "../../../../App/Models/SimpleKey";

@Component({
    selector : 'movimiento-detalles',
    directives : [FormLabelComponent, FormFeedbackComponent],
    template :
`<div class="form-group" [ngClass]="{'has-error' : toggleValidationFeedback('proveedor')}" [hidden]="!render.proveedor">
    <form-label [opciones]="{ id : 'proveedor-detalle', nombre : 'Proveedor'}"></form-label>
    <div class="col-sm-7 col-md-5">
        <select class="form-control" id="proveedor-detalle" [(ngModel)]="proveedorDetalle" (change)="objectToFormControl($event, 'proveedores', 'proveedor')" >
            <option *ngFor="#proveedor of proveedores" [value]="proveedor.id">{{ proveedor.razonSocial }}</option>
        </select>
    </div>
</div>
<div class="form-group" [ngClass]="{'has-error' : toggleValidationFeedback('factura')}" [hidden]="!render.factura">
    <form-label [opciones]="{ id : 'factura-detalle', nombre : 'Factura'}"></form-label>
    <div class="col-sm-7 col-md-5">
        <input type="tel" class="form-control" id="factura-detalle" [ngFormControl]="formControl.controls['factura']" />
    </div>
</div>
<div class="form-group" [ngClass]="{'has-error' : toggleValidationFeedback('bodega')}" [hidden]="!render.bodega">
    <form-label [opciones]="{ id : 'bodega-detalle', nombre : 'Bodega'}"></form-label>
    <div class="col-sm-7 col-md-5">
        <select class="form-control" id="bodega-detalle" [(ngModel)]="bodegaDetalle" (change)="objectToFormControl($event, 'bodegas', 'bodega')" >
            <option *ngFor="#bodega of bodegas" [value]="bodega.id">{{ bodega.nombre }}</option>
        </select>
    </div>
</div>
<div class="form-group" [ngClass]="{'has-error' : toggleValidationFeedback('confirmacion')}" [hidden]="!render.confirmacion">
    <form-label [opciones]="{ id : 'confirmacion-detalle', nombre : 'Confirmacion'}"></form-label>
    <div class="col-sm-7 col-md-5">
        <input type="tel" class="form-control" id="confirmacion-detalle" [ngFormControl]="formControl.controls['confirmacion']" />
    </div>
</div>
<div class="form-group" [ngClass]="{'has-error' : toggleValidationFeedback('productor')}" [hidden]="!render.productor">
    <form-label [opciones]="{ id : 'productor-detalle', nombre : 'Productor'}"></form-label>
    <div class="col-sm-7 col-md-5">
        <select class="form-control" id="productor-detalle" [(ngModel)]="productorDetalle" (change)="objectToFormControl($event, 'productores', 'productor')" >
            <option *ngFor="#productor of productores" [value]="productor.id">{{ productor.razonSocial }}</option>
        </select>
    </div>
</div>
<div class="form-group" [ngClass]="{'has-error' : toggleValidationFeedback('plantacion')}" [hidden]="!render.plantacion">
    <form-label [opciones]="{ id : 'plantacion-detalle', nombre : 'Plantacion'}"></form-label>
    <div class="col-sm-7 col-md-5">
        <select class="form-control" id="plantacion-detalle" [(ngModel)]="plantacionDetalle" (change)="objectToFormControl($event, 'plantaciones', 'plantacion')" >
            <option *ngFor="#plantacion of plantaciones" [value]="plantacion.id">{{ plantacion.razonSocial }}</option>
        </select>
    </div>
</div>`
})
export class MovimientoDetallesComponent extends FormController {
    @Input() proveedores : EmpresaModel[];
    @Input() productores : EmpresaModel[];
    @Input() plantaciones : PlantacionModel[];
    @Input() bodegas : BodegaModel[];
    @Input() set motivoMovimiento( tipo : SimpleKey ) { if(tipo !== null) this.renderSelection(tipo) }
    @Input() set reset( trigger ) { this.buildForm() }
    @Output() _detalle = new EventEmitter();

    proveedorDetalle : number;
    bodegaDetalle : number;
    productorDetalle : number;
    plantacionDetalle : number;

    render : {
        proveedor : boolean,
        factura : boolean,
        bodega : boolean,
        confirmacion : boolean,
        productor : boolean,
        plantacion : boolean
    };

    constructor(public _formBuidler : FormBuilder,
                _notifyService : NotifyService){ super(_notifyService) }

    ngOnInit() {
        this.buildForm();
    }

    enviarDetalle() {
        let value = (this.formControl.valid) ? this.formControl.value : null;
        this._detalle.emit(value)
    }

    /** Resets the form **/
    buildForm() {
        /** Resets the form control **/
        this.formControl = this._formBuidler.group({
            proveedor : [null],
            factura : [null],
            productor : [null],
            plantacion : [null],
            bodega : [null],
            confirmacion : [null]
        });

        this.formControl.valueChanges.subscribe(() => this.enviarDetalle())

        /** Resets the display **/
        this.render = {
            proveedor : false,
            factura : false,
            bodega : false,
            confirmacion : false,
            productor : false,
            plantacion : false
        };

        /** Resets the select inputs **/
        this.proveedorDetalle = null;
        this.bodegaDetalle = null;
        this.productorDetalle = null;
        this.plantacionDetalle = null;
    }

    renderSelection( motivo : SimpleKey ) {
        this.buildForm();
        switch(motivo.id){
            case 1 :
                this.render.proveedor = true;
                this.render.factura = true;
                this.addControl("proveedor", [null, Validators.required]);
                this.addControl("factura", [null, Validators.required]);
                break;
            case 2:
                this.render.bodega = true;
                this.render.confirmacion = true;
                this.addControl("bodega", [null, Validators.required]);
                this.addControl("confirmacion", [null, Validators.required]);

                break;
            case 3:
                this.render.productor = true;
                this.render.plantacion = true;
                this.addControl("productor", [null, Validators.required]);
                this.addControl("plantacion", [null, Validators.required]);
                break;
            case 4:
                this.render.productor = true;
                this.render.plantacion = true;
                this.addControl("productor", [null, Validators.required]);
                this.addControl("plantacion", [null, Validators.required]);
                break;
            case 5:
                this.render.bodega = true;
                this.addControl("bodega", [null, Validators.required]);
                break;
            case 6 :
                this.render.proveedor = true;
                this.render.factura = true;
                this.addControl("proveedor", [null, Validators.required]);
                this.addControl("factura", [null, Validators.required]);
                break;
        }
    }
}