import {Component} from "angular2/core";
import {FormBuilder, Validators} from "angular2/common";
import {Router} from "angular2/router";

import {FormController} from "../../../App/FormController";

import {FormFeedbackComponent} from "../../../App/Components/Forms/FormFeedbackComponent";
import {FormLabelComponent} from "../../../App/Components/Forms/FormLabelComponent";
import {MovimientoListaMaterialesComponent} from "./MovimientoMaterial/MovimientoListaMaterialesComponent";
import {MovimientoMaterialComponent} from "./MovimientoMaterial/MovimientoMaterialComponent";

import {FilterPropertyPipe} from "../../../Pipes/FilterPropertyPipe";

import {OpcionesService} from "../../../App/Services/OpcionesService";
import {AdministracionService} from "../../../Administracion/Services/AdministracionService";
import {InventarioService} from "../../Services/InventarioService";
import {NotifyService} from "../../../Notify/Services/NotifyService";

import {BodegaModel} from "../../../Administracion/Models/BodegaModel";
import {MaterialModel} from "../../../Administracion/Models/MaterialModel";
import {SimpleKey} from "../../../App/Models/SimpleKey";
import {MovimientoMaterialModel} from "../../Models/MovimientoMaterialModel";
import {MovimientoInventarioModel} from "../../Models/MovimientoInventarioModel";
import {MovimientoDetallesComponent} from "./MovimientoDetalles/MovimientoDetallesComponent";
import {EmpresaModel} from "../../../Administracion/Models/EmpresaModel";
import {PlantacionModel} from "../../../Administracion/Models/PlantacionModel";

@Component({
    selector : 'ingresar-movimiento',
    pipes : [FilterPropertyPipe],
    directives : [FormFeedbackComponent, FormLabelComponent, MovimientoMaterialComponent, MovimientoListaMaterialesComponent, MovimientoDetallesComponent],
    template :
`<div class="container-fluid">
    <h4>Movimientos de Inventario</h4>
    <form class="form-horizontal">
        <fieldset [disabled]="isFormDisabled()">
            <div class="form-group" [ngClass]="{'has-error' : toggleValidationFeedback('tipoMovimiento')}">
                <form-label [opciones]="{ id : 'tipoMovimiento', nombre : 'Acci&oacute;n'}"></form-label>
                <div class="col-sm-7 col-md-5">
                    <select class="form-control" id="tipoMovimiento" [(ngFormControl)]="formControl.controls['tipoMovimiento']">
                        <option [value]="1">Ingreso</option>
                        <option [value]="0">Egreso</option>
                    </select>
                </div>
                <form-feedback [message]="'Seleccionar una opci&oacute;n por favor.'"></form-feedback>
            </div>
            <div class="form-group" [ngClass]="{'has-error' : toggleValidationFeedback('bodega')}">
                <form-label [opciones]="{ id : 'bodega', nombre : 'Bodega'}"></form-label>
                <div class="col-sm-7 col-md-5">
                    <select class="form-control" id="bodega" [ngModel]="b" (change)="objectToFormControl($event, 'bodegas', 'bodega')" >
                        <option *ngFor="#bodega of bodegas" [value]="bodega.id">{{ bodega.nombre }}</option>
                    </select>
                </div>
                <form-feedback [message]="'Seleccionar una opci&oacute;n por favor.'"></form-feedback>
            </div>
            
            <movimiento-material [tiposMateriales]="tiposMateriales" [materiales]="materialesElegibles()" (_movimientoMaterial)="agregarMaterial($event)"></movimiento-material>
            <movimiento-lista-materiales [materiales]="getControlValue('movimientosMateriales')" (_movimientoMaterial)="removerMaterial($event)"></movimiento-lista-materiales>
            
            <div class="form-group" [ngClass]="{'has-error' : toggleValidationFeedback('motivoMovimiento')}">
                <form-label [opciones]="{ id : 'motivo', nombre : 'Motivo'}"></form-label>
                <div class="col-sm-7 col-md-5">
                    <select class="form-control" id="motivo" [ngModel]="m" (change)="objectToFormControl($event, 'motivosMovimiento', 'motivoMovimiento')" >
                        <option *ngFor="#motivoMovimiento of motivosMovimiento | filterProperty : 'number' : 'tipo' : getControlValue('tipoMovimiento')" [value]="motivoMovimiento.id">{{ motivoMovimiento.nombre }}</option>
                    </select>
                </div>
                <form-feedback [message]="'Seleccionar una opci&oacute;n por favor.'"></form-feedback>
            </div>
            
            <movimiento-detalles [plantaciones]="plantaciones" [bodegas]="bodegas" [productores]="productores" [proveedores]="proveedores" [motivoMovimiento]="getControlValue('motivoMovimiento')"></movimiento-detalles>
            
            <div class="form-group" [ngClass]="{'has-error' : toggleValidationFeedback('notas')}">
                <form-label [opciones]="{ id : 'notas', nombre : 'Obervaciones'}"></form-label>
                <div class="col-sm-7 col-md-5">
                    <textarea class="form-control" id="notas" [(ngFormControl)]="formControl.controls['notas']"></textarea>
                </div>
                <form-feedback [message]="'Seleccionar una opci&oacute;n por favor.'"></form-feedback>
            </div>
            <div class="form-group">
                <div class="col-sm-7 col-md-5 col-sm-push-3">
                    <button class="btn btn-primary" [disabled]="disableSubmit()" (click)="submit()">Generar Ingreso</button>
                </div>
            </div>
        </fieldset>
    </form>
</div>`
})
export class IngresarMovimientoInventario extends FormController {
    bodegas : BodegaModel[];
    materiales :  MaterialModel[];
    tiposMateriales : SimpleKey[];
    motivosMovimiento : SimpleKey[];

    proveedores : EmpresaModel[];
    productores : EmpresaModel[];
    plantaciones : PlantacionModel[];
    
    constructor(public _router : Router,
                public _formBuilder : FormBuilder,
                public _administracionService : AdministracionService,
                public _opcionesService : OpcionesService,
                public _inventarioService : InventarioService,
                _notifyService : NotifyService) { super(_notifyService) }

    ngOnInit() {
        this.formControl = this._formBuilder.group({
            tipoMovimiento : [null, Validators.required],
            bodega : [null, Validators.required],
            motivoMovimiento : [null, Validators.required],
            movimientosMateriales: [null, Validators.required],
            notas: [null, Validators.required]
        });

        this.subscribeResource("bodegas", this._administracionService.getBodegas());
        this.subscribeResource("materiales", this._administracionService.getMateriales());
        this.subscribeResource("tiposMateriales", this._opcionesService.getTiposMaterial());
        this.subscribeResource("motivosMovimiento", this._opcionesService.getMotivosMovimientoInventario());

        this.subscribeResource("productores", this._administracionService.getEmpresas(0));
        this.subscribeResource("proveedores", this._administracionService.getEmpresas(1));
        this.subscribeResource("plantaciones", this._administracionService.getPlantaciones());
    }

    materialesElegibles() : MaterialModel[] {
        let selecionados = <MovimientoMaterialModel[]>this.formControl.controls["movimientosMateriales"].value;
        return (selecionados == null) ? this.materiales :
            this.materiales.filter(material => {
                for(let i = 0; i < selecionados.length; i++) {
                    if (selecionados[i].material.id == material.id) return false;
                }
                return true;
            });
    }

    agregarMaterial( material : MovimientoMaterialModel ) : void {
        let stackMateriales = this.getControlValue('movimientosMateriales');
        if(stackMateriales == null ) stackMateriales = [];

        stackMateriales = [...stackMateriales, material ];
        this.updateControlValue('movimientosMateriales', stackMateriales);
    }

    removerMaterial( material : MovimientoMaterialModel) : void {
        let stackMateriales = <MovimientoMaterialModel[]>this.getControlValue('movimientosMateriales');
        const index = stackMateriales.indexOf(material);

        stackMateriales = [...stackMateriales.slice(0, index), ...stackMateriales.slice(index+1)];
        if(stackMateriales.length == 0 ) this.updateControlValue('movimientosMateriales', null);
        else this.updateControlValue('movimientosMateriales', stackMateriales);
    }

    disableSubmit() {
        return !this.formControl.valid;
    }
    
    submit() {
        if(this.formControl.valid) {
            this.toggleForm();
            let datos = this.formControl.value;

            let movimiento = new MovimientoInventarioModel(null, datos.bodega, datos.tipoMovimiento, datos.motivoMovimiento);
            movimiento.movimientosMateriales = datos.movimientosMateriales;

            this._notifyService.loader(true);
            this._inventarioService.postMovimiento(movimiento)
                .subscribe(
                    movimiento => {
                        this._notifyService.show("Movimiento Ingresado con exito.", 3000);
                        this._router.navigate(["/Inventario/MovimientosInventario/VerMovimientoInventario", {id : movimiento.id}]);
                        this._notifyService.loader(false);
                    },
                    error => {
                        this.toggleForm();
                        this._notifyService.error(error.json());
                        this._notifyService.loader(false);
                    }
                );
        }
    }
}