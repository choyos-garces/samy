import {Component} from "angular2/core";
import {Router} from "angular2/router";
import {FormBuilder, Validators, ControlGroup} from "angular2/common";

import {IngresoEmpresaComponent} from "../Empresas/IngresoEmpresaComponent";
import {AdministracionService} from "../../../Service/AdministracionService";

@Component({
    selector: 'ingresar-proveedor',
    directives : [IngresoEmpresaComponent],
    template : `<div class="container-fluid">
        <h4>Crear Ficha de Proveedor</h4>
        <form class="form-horizontal" autocomplete="off" spellcheck="false">
            <fieldset [disabled]="waiting">
            <ingreso-empresa [tipoEmpresa]="1" (onChange)="submitSection($event, 'datosEmpresa')"></ingreso-empresa>
            <div class="form-group">
                <div class="col-sm-7 col-md-5 col-sm-push-3">
                    <input type="submit" class="btn btn-primary" value="Crear Productor" [disabled]="!datosProveedor.valid" (click)="submit()"/>
                </div>
            </div>
            </fieldset>
        </form>
    </div>`
})
export class IngresarProveedorComponent {
    datosProveedor : ControlGroup;
    waiting : boolean;


    constructor(public _administracionService : AdministracionService,
                public _formBuilder : FormBuilder,
                public _router : Router) {}

    ngOnInit() {
        this.datosProveedor = this._formBuilder.group({
            datosEmpresa : [null, Validators.required],
            datosContacto : [null],
            datosPlantacion : [null]
        });

        this.waiting = false;
    }

    submitSection(data : any, controlName : string) {
        this.datosProveedor.controls[controlName].updateValue(data, {});
    }

    submit() : void {
        if(this.datosProveedor.valid) {
            this.waiting = true;
            const values = this.datosProveedor.value;
            this._administracionService.postEmpresa(values.datosEmpresa).subscribe(empresa => {
                this._router.navigate(['VerProveedor', { id : empresa.id }]);
            });
        }
        else {
            alert("Errores en el formulario")
        }
    }
}