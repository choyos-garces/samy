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

    protected getControl(control) : Control {
        return <Control>this.formControl.controls[control];
    }

    protected addControl(name, arg : any[]) : void {
        let control : Control;
        if(arg.length == 2) control = new Control(arg[0], arg[1]);
        if(arg.length == 1 ) control = new Control(arg[0]);
        this.formControl.addControl(name, control);
    }

    protected getControlValue(control) : any {
        return this.getControl(control).value;
    }

    protected updateControlValue(control, value) : void {
        this.getControl(control).updateValue(value, {emitEvent: true});
    }

    protected updateControlTouched(control) : void {
        this.getControl(control).markAsTouched();
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
        this.updateControlTouched(control);
    }

    protected toggleValidationFeedback(control) : boolean {
        control = this.getControl(control);
        return !control.valid && control.touched;
    }

    protected toggleForm() : void {
        this.waiting = (this.waiting) ? false : true;
    }

    protected isFormDisabled() : boolean {
        return this.waiting;
    }

    protected disableSubmit() : boolean {
        return !this.formControl.valid;
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