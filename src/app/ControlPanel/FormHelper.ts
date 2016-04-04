import {Control, ControlGroup} from "angular2/common";
export class FormHelper {

    public formControl : ControlGroup;
    private waiting : boolean = false;

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
        const id = parseInt(event.target.value);
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

}