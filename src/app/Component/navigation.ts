import {Component} from 'angular2/core'

@Component({
    selector : 'navigation',
    template : `
    <ul>
        <li *ngFor="#item of items">
            {{ item.label }}
        </li>
    </ul>
    `
})
export class Navigation {
    items : any;

    constructor() {
        this.items = [];

        this.items.push(
            { label : "Recursos", href : "" },
            { label : "Inventario" }
        );
    }

    ngOnInit() {}
}