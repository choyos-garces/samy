import 'rxjs/Rx'
import {bootstrap} from 'angular2/platform/browser'
import {provide, enableProdMode} from "angular2/core";
import {HTTP_PROVIDERS} from "angular2/http";
import {ROUTER_PROVIDERS, APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from "angular2/router";

import {Index} from "./index";

import {MovimientosInventarioService} from "./Inventario/Services/MovimientosInventarioService";
import {InventarioMaterialesService} from "./Inventario/Services/InventarioMaterialesService";
import {AdministracionService} from "./Administracion/Services/AdministracionService";
import {ControlPanelService} from "./ControlPanel/Services/ControlPanelService";
import {OpcionesService} from "./ControlPanel/Services/OpcionesService";

enableProdMode();
bootstrap(Index, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    //provide(APP_BASE_HREF, {useValue: '/samy'}),
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    ControlPanelService, OpcionesService, AdministracionService,
    MovimientosInventarioService, InventarioMaterialesService
]);