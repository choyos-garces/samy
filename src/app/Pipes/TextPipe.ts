import {Pipe} from "angular2/core";
@Pipe({
    name : 'text'
})
export class TextPipe {
    transform(text : string, arg : any[]) : string {
        return (text == null) ? null : text.replace(/\r?\n/g, '<br />');
    }
}