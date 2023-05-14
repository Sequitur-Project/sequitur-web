import { DatePipe } from '@angular/common';
import { Component, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDate'
})
export class ShortDateComponent implements PipeTransform {

  transform(date: Date): string | null {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, 'MM/dd/yyyy');
  }

}
