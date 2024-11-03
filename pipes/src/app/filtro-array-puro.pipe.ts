import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtroArrayPuro',
  standalone: true,
  pure: true
})
export class FiltroArrayPuroPipe implements PipeTransform {

  transform(value: any, ...args: any): any {

    if (!value || value.length === 0 || args.length === 0) {
      return value;
    }

    let filter = args[0].toLocaleLowerCase();
    return value.filter(
      (v: string) => v.toLocaleLowerCase().includes(filter)
    );
  }
}
