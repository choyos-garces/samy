import {Component, EventEmitter, Output, Input} from "angular2/core";
import {FormBuilder, Validators} from "angular2/common";

import {MaterialModel} from "../../../../Administracion/Models/MaterialModel";
import {MovimientoMaterialModel} from "../../../Models/MovimientoMaterialModel";
import {SimpleKey} from "../../../../ControlPanel/Models/SimpleKey";
import {FilterSimpleKey} from "../../../../Pipes/FilterSimpleKey";
import {FormHelper} from "../../../../ControlPanel/FormHelper";

@Component({
    selector : "movimiento-material",
    pipes : [FilterSimpleKey],
    template : `<div class="form-group">
        <label class="control-label col-sm-3" for="movimientoInventarioMaterial">Materiales</label>
        <div class="col-sm-9 col-md-7">
            <div class="input-group">
                <div class="input-group-btn select-group">
                    <select class="form-control" id="tipoMaterial" [(ngModel)]="tipoMaterial">
                        <option *ngFor="#opcion of tiposMateriales" [value]="opcion.id">{{ opcion.nombre }}</option>
                    </select>
                </div>
                <div class="input-group-btn select-group">
                    <select class="form-control" id="material" [(ngModel)]="material" (change)="objectToFormControl($event, 'materiales', 'material')">
                        <option *ngFor="#opcion of materiales | filterSimpleKey : 'tipoMaterial' : tipoMaterial" [value]="opcion.id">{{ opcion.nombre }}</option>
                    </select>
                </div>
                <input type="number" placeholder="Cantidad" step="0.01" min="0" max="999" class="form-control" id="cantidad" [(ngFormControl)]="formControl.controls['cantidad']" (keyup)="maxDecimalAllowed($event, 7, 2)" />
                <div class="input-group-btn">            
                    <button class="btn btn-primary" (click)="envioMaterial()" [disabled]="disableEnvio()"><i class="fa fa-check"></i></button>
                </div>
            </div>
        </div>
    </div>`
})
export class MovimientoMaterialComponent extends FormHelper {
    @Input() materiales : MaterialModel[];
    @Input() tiposMateriales : SimpleKey[];
    @Output() _movimientoMaterial = new EventEmitter();
    material; // Temporary Model
    tipoMaterial; // Temporary Model

    constructor(public _formBuilder : FormBuilder) {
        super();
    }

    ngOnInit() : void {
        this.formControl = this._formBuilder.group({
            material : [null, Validators.required],
            cantidad : [null, Validators.required]
        });
    }

    disableEnvio() : boolean {
        return !this.formControl.valid;
    }

    envioMaterial() : void {
        if(this.formControl.valid) {
            var material = <MaterialModel> this.getControlValue('material');
            var cantidad = parseFloat(this.getControlValue('cantidad'));

            this._movimientoMaterial.emit( new MovimientoMaterialModel(null, material, cantidad) );

            this.updateControlValue('material', null);
            this.updateControlValue('cantidad', null);
            this.material = null;
            this.tipoMaterial = null;
        }
    }
}