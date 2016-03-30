import {Pipe} from "angular2/core";

@Pipe({
    name : 'datetime'
})
export class DatetimePipe {
    transform(datetime :  string, arg : string[]) : string {
        const date = new Date(datetime);
        if(arg[0] == "short") return this.shortFormat(date);
        else if(arg[0] == "long") return this.longFormat(date);
        else return this.defaultFormat(date);
    }

    private addZero(value : number) : string {
        if(value == 0 ) return "00";
        else if (value < 10 ) return "0" + value;
        else return "" + value;
    }

    private getMes(value : number) : string {
        const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
        return meses[value];
    }

    private defaultFormat(date) {
        return date.getHours() +":"+date.getMinutes() + " " + this.addZero(date.getMonth()+1) + "/" + this.addZero(date.getDate()) +"/"+ date.getFullYear();
    }

    private longFormat(date) {
        return this.getMes(date.getMonth()) + " " +this.addZero(date.getDate()) +" del "+ date.getFullYear() + " " + date.getHours() +":"+date.getMinutes();
    }

    private shortFormat(date) {
        return this.addZero(date.getMonth()+1) + "/" + this.addZero(date.getDate()) +"/"+ date.getFullYear();
    }
}