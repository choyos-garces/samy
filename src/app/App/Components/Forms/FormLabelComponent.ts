import {Input, Component} from "angular2/core";

@Component({
    selector : 'form-label',
    template : '<label class="control-label col-sm-3" for="opciones.id">{{ opciones.nombre }}</label>'
})
export class FormLabelComponent {
    @Input() opciones : { id : string, nombre : string};
}