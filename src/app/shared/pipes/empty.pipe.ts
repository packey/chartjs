import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'empty',
  pure: true
})
export class EmptyPipe implements PipeTransform {
  transform(value: any, emptyLabel: string = ''): string {
    return value ? value : emptyLabel;
  }
}
