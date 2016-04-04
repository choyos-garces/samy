import {Injectable} from "angular2/core";
import {Observer} from "rxjs/Observer";
import {Observable} from "rxjs/Observable";
import {isArray} from "angular2/src/facade/lang";

enum NotifyTypes {
    NOTIFY_TOAST, NOTIFY_MEDIUM, NOTIFY_FULL
}

enum NotifyStyles {
    STYLE_DEFAULT, STYLE_WARNING, STYLE_SUCCES
}

interface opciones {
    delay? : number,
    type? : NotifyTypes,
    styles? : NotifyStyles,
    link? : [ string, {} ]
}

@Injectable()
export class NotifyService {
    displayToaster : Observable<boolean>;
    displayLoader : Observable<boolean>;
    opciones : opciones;

    private _toasterObserver : Observer<boolean>;
    private _loaderObserver : Observer<boolean>;
    private _messages : string[];
    private _default : opciones;

    constructor() {
        this._messages = [];

        this.opciones = this._default = {
            delay : 3000,
            type : NotifyTypes.NOTIFY_TOAST
        };

        this.displayToaster = new Observable(observer => this._toasterObserver = observer)
            .startWith(false)
            .share();
        
        this.displayLoader = new Observable(observer => this._loaderObserver = observer)
            .startWith(false)
            .share()
    }
    
    private addMessage(msg : string | string[]) : number {
        if(isArray(msg)) this._messages = [...this._messages, ...<string[]>msg];
        else this._messages = [...this._messages, <string> msg];
        
        return this._messages.length;
    }
    
    private clear() : void {
        this._messages = [];
    }

    private toogleDisplay() : void {
        this._toasterObserver.next(true);

        setTimeout(() => {
            this.clear();
            this.opciones = this._default;
            this._toasterObserver.next(false);
        }, this.opciones.delay)
    }

    get messages() : string[] {
        return this._messages;
    }

    show(msg : string | string[], delay? : number) {
        this.addMessage(msg);
        if(typeof delay != "undefined") this.opciones.delay = delay;

        this.toogleDisplay();
    }

    error(msg : string | string[], delay? : number) {
        this.addMessage(msg);
        this.opciones.delay = (typeof delay != "undefined") ? delay : 7000;

        this.toogleDisplay();
    }
    
    loader(toggle : boolean = true) : void {
        this._loaderObserver.next(toggle);
    }

}