import 'rxjs/Rx'
import {bootstrap} from 'angular2/platform/browser'
import {provide} from "angular2/core";
import {HTTP_PROVIDERS} from "angular2/http";
import {ROUTER_PROVIDERS, APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from "angular2/router";

import {Index} from "./Component/index";

import {MovimientosInventarioService} from "./Service/Inventario/MovimientosInventarioService";
import {InventarioMaterialesService} from "./Service/Inventario/InventarioMaterialesService";
import {AdministracionService} from "./Service/AdministracionService";
import {ControlPanelService} from "./Service/ControlPanelService";
import {OpcionesService} from "./Service/OpcionesService";

bootstrap(Index, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    //provide(APP_BASE_HREF, {useValue: '/samy'}),
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    ControlPanelService, OpcionesService, AdministracionService,
    MovimientosInventarioService, InventarioMaterialesService
]);