import {Pipe} from "angular2/core";

@Pipe({
    name : 'datetime'
})
export class DatetimePipe {
    transform(datetime :  string, arg : boolean[]) : string {
        const date = new Date(datetime);
        return this.getMes(date.getMonth()) + " " +this.addZero(date.getDate()) +" del "+ date.getFullYear() + " " + date.getHours() +":"+date.getMinutes();
    }

    private addZero(value : number) : string {
        return value < 10 ? "0" + value : ""+ value;
    }

    private getMes(value : number) : string {
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        return meses[value];
    }
}