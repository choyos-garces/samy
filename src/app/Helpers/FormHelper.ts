import {Control, ControlGroup} from "angular2/common";
export class FormHelper {
    static simpleKeyToControl(controlGroup, index, collection, controlName) {
        console.log(controlGroup, index, collection, controlName)
    }

    static toggleInput(flag : Control, target : string ) : void {
        let ele = <HTMLInputElement> document.getElementById(target);
        ele.disabled = !flag.value ;
    }

    static toggleValidationFeedback(collection : ControlGroup, controlName : string) : boolean {
        var control = <Control> collection.controls[controlName];
        return !(!control.valid && control.touched);
    }
}