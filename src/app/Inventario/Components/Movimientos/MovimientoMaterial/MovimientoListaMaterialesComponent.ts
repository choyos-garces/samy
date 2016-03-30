import {Input, Component, Output, EventEmitter} from "angular2/core";
import {MovimientoMaterialModel} from "../../../Models/MovimientoMaterialModel";

@Component({
    selector : 'movimiento-lista-materiales',
    template : `<div class="form-group">
        <div class="col-sm-9 col-md-7 col-sm-push-3">
            <table class="table table-hover table-comfortable">
                <thead>
                    <tr>
                        <th class="col-xs-1"></th>
                        <th colspan="2"></th>
                        <th class="hidden-xs hidden-sm"></th>
                        <th class="col-xs-1"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor="#movimiento of materiales;#i = index">
                        <td>{{ i + 1 }}</td>
                        <td>{{ movimiento.material.nombre }}</td>
                        <td class="hidden-xs hidden-sm">{{ movimiento.material.tipoMaterial.nombre }}</td>
                        <td class="text-right">{{ movimiento.cantidad }}</td>
                        <td><button class="btn" (click)="remove(movimiento)"><i class="fa fa-trash-o"></i></button></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="3">Selecci&oacute;n Total:</td>
                        <td class="hidden-xs hidden-sm"></td>
                        <td><span class="btn">{{ total() }}</span></td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>`
})
export class MovimientoListaMaterialesComponent {
    @Input() materiales;
    @Output() actualizarMateriales = new EventEmitter();

    total() : number {
        return (typeof this.materiales) != "undefined" ? this.materiales.length : 0;
    }

    remove(movimientoMaterial : MovimientoMaterialModel) {
        this.actualizarMateriales.emit(movimientoMaterial);
    }
}