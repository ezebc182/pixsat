import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
    name: 'ucfirst'
})
export class UcfirstPipe implements PipeTransform {

    transform(input: string): string {
        return (!!input) ? input.charAt(0).toUpperCase() + input.slice(1) : '';
    }

}
