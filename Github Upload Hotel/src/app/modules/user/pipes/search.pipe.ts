import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {
  transform(hotelsData: any[], searchInput:any): any[]  {
    if (!hotelsData || !searchInput) {
      return hotelsData;
    }

    return hotelsData.filter(hotel => {
      // Modify this condition based on the property you want to search by
      return  JSON.stringify(hotel).toLowerCase().includes(searchInput.toLowerCase());
    });


  }
}