import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class PaginadoFrontService {
  constructor() {}
  paginateFront(arr: any, currentPage: number, itemsPerPage: number) {
    const offset = (currentPage - 1) * itemsPerPage;
    const endset = currentPage * itemsPerPage 
    const newarr = arr.slice(offset, endset);
    return newarr;
  }
}
