import {Control, ControlGroup} from "angular2/common";
import {NotifyService} from "../Notify/Services/NotifyService";
export class FormController {

    public _notifyService : NotifyService;
    public formControl : ControlGroup;
    private resources : any[] = [];
    private waiting : boolean = false;

    constructor(_notifyService : NotifyService) {
        this._notifyService = _notifyService;
    }
    protected toggleForm() : void {
        this.waiting = !this.waiting;
    }

    protected isFormDisabled() : boolean {
        return this.waiting;
    }
    
    protected toggleValidationFeedback(control) : boolean {
        control = <Control>this.formControl.controls[control];
        return !control.valid && control.touched
    }

    protected objectToFormControl(event, collection, control) : void {
        const id = parseInt((typeof event == "object") ? event.target.value : event);
        var value;
        
        if(isNaN(id)) {
            value = null;
        }
        else {
            const result = this[collection].filter((item : any) => item.id == id );
            value = (result.length == 1) ? result[0] : null;
        }

        this.updateControlValue(control,value);
    }

    protected updateControlValue(control, value) : void {
        (<Control>this.formControl.controls[control]).updateValue(value, {});
    }
    
    protected getControlValue(control) : any {
        return (<Control>this.formControl.controls[control]).value;
    }



    protected allResourcesLoaded() : boolean {
        let flag = true;
        for(let i = 0; i < this.resources.length; i++ ) {
            if(typeof this[this.resources[i]] == "undefined") flag = false;
        }
        
        return flag;
    }

    protected subscribeResource(resourceName, observable) {
        this.resources = [ ...this.resources, resourceName ];
        
        this._notifyService.loader(true);
        observable.subscribe(
            resource => {
                this[resourceName] = resource;
                this._notifyService.loader(!this.allResourcesLoaded());
            },
            () => {
                this.toggleForm();
                this._notifyService.error("Error al recolectar la informacion de Bodegas.");
                this._notifyService.loader(false);
            }
        );
    }
}