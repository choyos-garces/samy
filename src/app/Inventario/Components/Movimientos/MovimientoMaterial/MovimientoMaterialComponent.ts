import {Component, EventEmitter, Output} from "angular2/core";
import {ControlGroup, FormBuilder, Validators, Control} from "angular2/common";

import {MaterialModel} from "../../../../Administracion/Models/MaterialModel";
import {MovimientoMaterialModel} from "../../../Models/MovimientoMaterialModel";
import {SimpleKey} from "../../../../ControlPanel/Models/SimpleKey";
import {FilterSimpleKey} from "../../../../Pipes/FilterSimpleKey";
import {AdministracionService} from "../../../../Administracion/Services/AdministracionService";
import {OpcionesService} from "../../../../ControlPanel/Services/OpcionesService";

@Component({
    selector : "movimiento-material",
    pipes : [FilterSimpleKey],
    directives : [],
    template : `<div class="form-group">
        <label class="control-label col-sm-3" for="movimientoInventarioMaterial">Materiales</label>
        <div class="col-sm-9 col-md-7">
            <div class="input-group">
                <div class="input-group-btn select-group">
                    <select class="form-control" id="movimientoInventarioMaterial" [(ngModel)]="tipoMaterial">
                        <option *ngFor="#opcion of tiposMaterial" [value]="opcion.id">{{ opcion.nombre }}</option>
                    </select>
                </div>
                <div class="input-group-btn select-group">
                    <select class="form-control" id="movimientoInventarioMaterial" [(ngModel)]="material" (ngModelChange)="objectToFormControl($event, 'materiales', 'material')">
                        <option *ngFor="#opcion of materiales | filterSimpleKey : 'tipo_material' : tipoMaterial" [value]="opcion.id">{{ opcion.nombre }}</option>
                    </select>
                </div>
                <input type="number" placeholder="Cantidad" step="0.01" min="0" class="form-control" id="movimientoInventarioCantidad" [(ngFormControl)]="movimietoMaterial.controls['cantidad']" />
                <div class="input-group-btn">            
                    <button class="btn btn-primary" (click)="enviarMaterial()" [disabled]="!disableEnvio()"><i class="fa fa-check"></i></button>
                </div>
            </div>
        </div>
    </div>`
})
export class MovimientoMaterialComponent {
    @Output() agregarMaterial = new EventEmitter();
    movimietoMaterial : ControlGroup;
    materiales : MaterialModel[];
    tiposMaterial : SimpleKey[];
    material; //Temporary Model
    tipoMaterial;

    constructor(public _formBuilder : FormBuilder,
                public _administracionService : AdministracionService,
                public _opcionesService : OpcionesService) {}

    ngOnInit(){
        this._opcionesService.getTiposMaterial().subscribe(tiposMaterial => this.tiposMaterial = tiposMaterial);
        this._administracionService.getMateriales().subscribe(materiales => this.materiales = materiales);

        this.movimietoMaterial = this._formBuilder.group({
            material : [null, Validators.required],
            cantidad : [null, Validators.required]
        });
    }

    disableEnvio() {
        return this.movimietoMaterial.valid;
    }

    enviarMaterial() {
        if(this.movimietoMaterial.valid) {
            var mm = this.movimietoMaterial.value;
            this.agregarMaterial.emit( new MovimientoMaterialModel(null, mm.material, mm.cantidad) );

            (<Control>this.movimietoMaterial.controls["material"]).updateValue(null, {});
            (<Control>this.movimietoMaterial.controls["cantidad"]).updateValue(null, {});
            this.material = null;
            this.tipoMaterial = null;
        }
    }

    objectToFormControl(id, collection, control) : void {
        const result = this[collection].filter((item : any) => item.id == id );
        (<Control>this.movimietoMaterial.controls[control]).updateValue((result.length == 1) ? result[0] : null);
    }
}