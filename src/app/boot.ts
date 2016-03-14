import 'rxjs/Rx'
import {bootstrap} from 'angular2/platform/browser'
import {provide} from "angular2/core";
import {HTTP_PROVIDERS} from "angular2/http";
import {ROUTER_PROVIDERS, APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from "angular2/router";

import {Index} from "./Component/index";
import {ClienteService} from "./Service/Recursos/ClientesService";

bootstrap(Index, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    //provide(APP_BASE_HREF, {useValue: '/samy'}),
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    ClienteService
]);