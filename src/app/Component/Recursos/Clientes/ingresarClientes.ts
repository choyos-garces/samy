import {Component} from 'angular2/core';

@Component({
    selector : 'ingresar-clientes',
    template : `
    <h4>Nuevo Cliente</h4>
    <form>
        <input type="text" name="nombre" placeholder="Nombre" />
        <input type="text" name="razon" placeholder="Raz&oacute;n Social" />
        <input type="text" name="ruc" placeholder="C&eacute;dula o R.U.C." />
        <input type="email" name="correoNotificaciones" placeholder="Correo para Notificaciones" />
        <input type="email" name="correoPersonal" placeholder="Correo Personal" />
        <input type="submit" value="Crear Cliente" />
    </form>
    `
})
export class IngresarClientes {

    constructor() {
    }

    ngOnInit() {}
}