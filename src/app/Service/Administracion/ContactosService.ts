import {Injectable} from "angular2/core";
import {ContactoModel} from "../../Model/Administracion/ContactoModel";

@Injectable()
export class ContactosService {
    contactos : Array<ContactoModel> = [];

    constructor() {
        let i : number = 1;
        this.contactos.push(
            
        );
    }

    push(contact : ContactoModel) : ContactoModel {
        contact.id = this.contactos[this.contactos.length - 1].id + 1;
        this.contactos.push(contact);

        return contact;
    }

    getContactos():Array<ContactoModel> {
        return this.contactos;
    }

    getById(id : number ) : ContactoModel {
        this.getContactos();
        let resultado = this.contactos.filter((cliente : ContactoModel) => {
            return cliente.id == id;
        });

        return (resultado.length == 1) ? resultado[0] : null;
    }
}