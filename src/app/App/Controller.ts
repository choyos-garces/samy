import {NotifyService} from "../Notify/Services/NotifyService";
import {Observable} from "rxjs/Observable";

export class Controller {

    public _notifyService;
    private resources : any[] = [];

    constructor(_notifyService : NotifyService) {
        this._notifyService = _notifyService;
    }

    protected allResourcesLoaded() : boolean {
        let flag = true;
        for(let i = 0; i < this.resources.length; i++ ) {
            if(typeof this[this.resources[i]] == "undefined") flag = false;
        }

        return flag;
    }

    protected subscribeResource(resourceName, observable : Observable <any>) {
        this.resources = [ ...this.resources, resourceName ];

        this._notifyService.loader(true);
        observable.subscribe(
            resource => {
                this[resourceName] = resource;
                this._notifyService.loader(!this.allResourcesLoaded());
            },
            error => {
                if(error.status == 404 || error.status == 400)
                    this._notifyService.error(error.json());
                else
                    this._notifyService.error("Error al recolectar la informacion.");
                
                this._notifyService.loader(false);
            }
        );
    }
}