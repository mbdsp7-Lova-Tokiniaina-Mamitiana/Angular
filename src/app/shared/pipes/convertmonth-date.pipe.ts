import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'convertmonthDate'
})
export class ConvertmonthDatePipe implements PipeTransform {

  transform(value: string): string {
    let monthListShort: { [key: string]: string } = {
      "01": "JANV",
      "02": "FEV",
      "03": "MARS",
      "04": "AVR",
      "05": "MAI",
      "06": "JUI",
      "07": "JUIL",
      "08": "AOU",
      "09": "SEP",
      "10": "OCT",
      "11": "NOV",
      "12": "DEC"
    }
    return monthListShort[value];
  }

}
