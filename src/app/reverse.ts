import { Pipe, PipeTransform } from '@angular/core';
import {JobListing} from "./app.component";

@Pipe({
  name: 'reversePipe'
})
export class ReversePipe implements PipeTransform {

  transform(value: any[]) {
    if (!value) return;

    return value.reverse();
  }
}
