import {Component} from 'angular2/core';
import {FormBuilder, ControlGroup, Validators, Control} from "angular2/common";
import {Router} from "angular2/router";

import {IngresoEmpresaComponent} from "../Empresas/IngresoEmpresaComponent";
import {AdministracionService} from "../../Services/AdministracionService";

@Component({
    selector : 'ingresar-productores',
    directives : [IngresoEmpresaComponent],
    template : `<div class="container-fluid">
        <h4>Crear Ficha de Productor</h4>
        <form class="form-horizontal" autocomplete="off" spellcheck="false">
            <fieldset [disabled]="waiting">
                <ingreso-empresa [tipoEmpresa]="0" (onChange)="submitSection($event, 'datosEmpresa')"></ingreso-empresa>
                <div class="form-group">
                    <div class="col-sm-7 col-md-5 col-sm-push-3">
                        <input type="submit" class="btn btn-primary" value="Crear Productor" [disabled]="!datosProductor.valid" (click)="submit()"/>
                    </div>
                </div>
            </fieldset>
        </form>
    </div>`
})
export class IngresarProductorComponent {
    datosProductor : ControlGroup;
    waiting : boolean;

    constructor(public _administracionService : AdministracionService,
                public _formBuilder : FormBuilder,
                public _router : Router) {}

    ngOnInit() {
        this.datosProductor = this._formBuilder.group({
            datosEmpresa : [null, Validators.required],
            datosContacto : [null],
            datosPlantacion : [null]
        });

        this.waiting = false;
    }

    submitSection(data : any, controlName : string) {
        (<Control>this.datosProductor.controls[controlName]).updateValue(data, {});
    }
    
    submit() : void {
        if(this.datosProductor.valid) {
            this.waiting = true;
            const values = this.datosProductor.value;
            this._administracionService.postEmpresa(values.datosEmpresa).subscribe(empresa => {
                this._router.navigate(['VerProductor', { id : empresa.id }]);
            });
        }
        else {
            alert("Errores en el formulario")
        }
    }
}