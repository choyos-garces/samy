import {Http, Headers, RequestOptions} from "angular2/http";

export class apiService {
    private baseURL : string;
    private headerOptions;
    component : string;
    
    constructor(public _http : Http) {
        this.baseURL = "http://192.168.1.29/api/public"; //Development
        //this.baseURL = "http://192.168.1.170/api/public"; //Prod

        let headers = new Headers({ 'Content-Type': 'application/json' });
        this.headerOptions = new RequestOptions({ headers: headers });
    }

    get(collection : string, id : number | string = null) {
        let paramenters = (id == null) ? "" :  id;
        let url = this.baseURL  + "/" + this.component + "/" + collection + "/" + paramenters;
        return this._http.get(url)
            .map(response => response.json())
    }

    post(collection : string, model : Object) {
        let body = JSON.stringify(model);

        return this._http.post(this.baseURL  + "/" + this.component + "/" + collection + "/ingresar", body, this.headerOptions)
            .map(response => response.json());
    }
    
}