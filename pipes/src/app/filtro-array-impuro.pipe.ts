import { Pipe, PipeTransform } from '@angular/core';
import { FiltroArrayPuroPipe } from './filtro-array-puro.pipe';

@Pipe({
  name: 'filtroArrayImpuro',
  standalone: true,
  pure: false
})
export class FiltroArrayImpuroPipe extends FiltroArrayPuroPipe {

}
