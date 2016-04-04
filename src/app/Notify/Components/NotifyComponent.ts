import {Component} from "angular2/core";
import {NotifyService} from "../Services/NotifyService";

@Component({
    selector : 'notify',
    template : `
<div class="notify">
    <div class="notify-loader" [ngClass]="{ pop : loader}">
        <div class="loader"></div>
    </div>
    <div class="notify-toaster" [ngClass]="{ pop : toaster }">
        <div class="notify-toast">
            <ul class="list-unstyled">
                <li *ngFor="#msg of messages">{{ msg }}</li>
            </ul>
        </div>
    </div>
</div>
    `
})
export class NotifyComponent {
    messages : string[] = [];
    toaster : boolean;
    loader : boolean;

    constructor(public _notifyService : NotifyService) {}
    
    ngOnInit() {
        this._notifyService.displayToaster.subscribe( state => {
            this.toaster = state;
            this.messages = this._notifyService.messages;
        });
        
        this._notifyService.displayLoader.subscribe(state => this.loader = state);
    }
}