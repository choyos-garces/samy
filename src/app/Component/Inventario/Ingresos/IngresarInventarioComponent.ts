import {Component} from 'angular2/core';
import {FormBuilder} from "angular2/common";
import {Router} from "angular2/router";

import {ProductoresService} from "../../../Service/Recursos/ProductoresService";
import {PlantacionesService} from "../../../Service/Recursos/PlantacionesService";
import {ProductorModel} from "../../../Model/Recursos/ProductorModel";
import {PlantacionModel} from "../../../Model/Recursos/PlantacionModel";
import {ControlGroup, Validators} from "angular2/common";

@Component({
    selector: 'ingresar-inventario',
    directives: [],
    template: `<div class="container-fluid">
        <h4>Generar Ingreso a Inventario</h4>
        </div>`
})
export class IngresarInventarioComponent {
    ingresarIngresoInventario : ControlGroup;
    clientes : Array<ProductorModel>;
    plantaciones : Array<PlantacionModel>;

    constructor(public _formBuilder : FormBuilder,
                public _router : Router,
                public _clientesService : ProductoresService,
                public _plantacionesService : PlantacionesService) {

        this.ingresarIngresoInventario = this._formBuilder.group([
            { cliente : [null, Validators.required] },
            { plantacion : [null, Validators.required] },
        ])
    }
}