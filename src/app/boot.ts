import 'rxjs/Rx'
import {bootstrap} from 'angular2/platform/browser'
import {provide} from "angular2/core";
import {HTTP_PROVIDERS} from "angular2/http";
import {ROUTER_PROVIDERS, APP_BASE_HREF, LocationStrategy, HashLocationStrategy} from "angular2/router";

import {Index} from "./Component/index";

import {ProductoresService} from "./Service/Administracion/ProductoresService";
import {BodegasService} from "./Service/Administracion/BodegasService";
import {MaterialesService} from "./Service/Administracion/MaterialesService";
import {PlantacionesService} from "./Service/Administracion/PlantacionesService";
import {ProveedoresService} from "./Service/Administracion/ProveedoresService";
import {ContactosService} from "./Service/Administracion/ContactosService";
import {MovimientosInventarioService} from "./Service/Inventario/MovimientosInventarioService";
import {InventarioMaterialesService} from "./Service/Inventario/InventarioMaterialesService";
import {AdministracionService} from "./Service/AdministracionService";

bootstrap(Index, [
    HTTP_PROVIDERS,
    ROUTER_PROVIDERS,
    //provide(APP_BASE_HREF, {useValue: '/samy'}),
    provide(LocationStrategy, {useClass: HashLocationStrategy}),
    AdministracionService,
    ProductoresService, BodegasService, MaterialesService, PlantacionesService, ProveedoresService, ContactosService,
    MovimientosInventarioService, InventarioMaterialesService
]);