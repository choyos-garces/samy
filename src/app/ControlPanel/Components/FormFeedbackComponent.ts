import {Component, Input} from "angular2/core";

@Component({
    selector : 'form-feedback',
    template : `
    <div class="col-sm-2 col-md-4">
        <div class="form-control-static control-error">
            <i class="fa fa-exclamation-circle"></i>
            <span class="visible-xs-inline">{{ message }}</span>
        </div>
    </div>
`
})
export class FormFeedbackComponent {
    @Input() message : string;
    
    
}