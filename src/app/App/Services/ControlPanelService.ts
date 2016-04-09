import {Injectable} from "angular2/core";
import {Http} from "angular2/http";
import {MotivoMovimientoModel} from "../../Inventario/Models/MotivoMovimientoModel";

@Injectable()
export class ControlPanelService {
    private url : string;

    constructor(public _http : Http) {
        this.url = "http://localhost/api/public/app_dev.php/controlPanel/";
    }

    getMotivosMovimiento() {
        return this._http.get(this.url + "motivosMovimientoInventario")
            .map(response => <MotivoMovimientoModel[]> response.json());
    }
}