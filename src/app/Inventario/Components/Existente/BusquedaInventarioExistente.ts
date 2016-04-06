import {Component, Output, EventEmitter, Input} from "angular2/core";
import {NotifyService} from "../../../Notify/Services/NotifyService";
import {FormBuilder, ControlGroup} from "angular2/common";
import {FormController} from "../../../ControlPanel/FormController";
import {SimpleKey} from "../../../ControlPanel/Models/SimpleKey";
import {BodegaModel} from "../../../Administracion/Models/BodegaModel";
import {AdministracionService} from "../../../Administracion/Services/AdministracionService";
import {OpcionesService} from "../../../ControlPanel/Services/OpcionesService";

@Component({
    selector : 'busqueda-inventario-existente',
    template : `
<div class="panel panel-default">
    <div class="panel-body">
        <form class="form-flex">
            <div class="form-group">
                <input type="text" id="codigo" class="form-control" placeholder="Codigo" [ngFormControl]="formControl.controls['codigo']"/>
            </div>
            <div class="form-group">
                <input type="text" id="material" class="form-control" placeholder="Material" [ngFormControl]="formControl.controls['material']"/>
            </div>
            <div class="form-group">
                <input type="text" id="tipoMaterial" list="tiposMaterial" class="form-control" placeholder="Tipo Material" [ngFormControl]="formControl.controls['tipoMaterial']"/>
            </div>
            <div class="form-group">
                <input type="text" id="bodega" list="bodegas" class="form-control" placeholder="Bodega" [ngFormControl]="formControl.controls['bodega']"/>
            </div>
            <div class="form-group">
                <input type="date" id="desde" class="form-control" [ngFormControl]="formControl.controls['desde']"/>
            </div>
            <div class="form-group">
                <input type="date" id="hasta" class="form-control" [ngFormControl]="formControl.controls['hasta']"/>
            </div>
        </form>
    </div>
    <datalist id="bodegas">
        <option *ngFor="#bodega of bodegas" [value]="bodega.nombre" >
    </datalist>
    <datalist id="tiposMaterial">
        <option *ngFor="#tipoMaterial of tiposMaterial" [value]="tipoMaterial.nombre" >
    </datalist>
</div>`
})
export class BusquedaInventarioExistente extends FormController {
    @Output() query = new EventEmitter();
    @Input() tiposMaterial : SimpleKey[];
    @Input() bodegas : BodegaModel[];

    constructor(_notifyService : NotifyService,
                public _formBuilder : FormBuilder) { super(_notifyService) }

    ngOnInit() {
        this.formControl = this._formBuilder.group({
            codigo : [null],
            material : [null],
            tipoMaterial : [null],
            bodega : [null],
            desde : [null],
            hasta : [null]
        });

        this.formControl.valueChanges.subscribe(values => {
            let query = {};
            if(values.codigo != null) query['material.codigo'] = { type: "string", value : values.codigo };
            if(values.material != null ) query['material.nombre'] = { type : "string", value : values.material};
            if(values.tipoMaterial != null ) query['material.tipoMaterial.nombre'] = { type : "string", value : values.tipoMaterial };
            if(values.bodega != null ) query['bodega.nombre'] = { type : "string" , value : values.bodega};
            if(values.desde != null || values.hasta != null) query['fecha'] = { type :"date",  from : values.desde , to : values.hasta};

            this.query.emit(query);
        });
    }
}