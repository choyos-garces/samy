import {Component} from "angular2/core";
import {NotifyService} from "../Services/NotifyService";

@Component({
    selector : 'notify',
    template : `
    <div class="notify notify-loader" [ngClass]="{ pop : loader}">
        <div class="loader"></div>
    </div>
    <div class="notify notify-toaster" [ngClass]="{ pop : toaster }">
        <div class="notify-body">
            <ul class="list-unstyled">
                <li *ngFor="#msg of messages">{{ msg }}</li>
            </ul>
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
            console.log("toaster : " + state)
        });
        
        this._notifyService.displayLoader.subscribe(state => {
            this.loader = state;
            console.log("loader : " + state)
        });
    }
}