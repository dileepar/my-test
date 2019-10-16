import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.css']
})
export class PaginationComponent implements OnInit, OnChanges {
  @Input() totalRows;
  @Output() pageClickedEvent = new EventEmitter<number>();
  pageSize: number = 10;
  paginationArray: number[] = []
  pageCount: number;

  constructor() { }

  ngOnInit() {
    this.constructPaginationArray();
  }

  ngOnChanges(){
    this.constructPaginationArray();
  }

  constructPaginationArray(){
    this.pageCount = Math.floor(this.totalRows/this.pageSize);

    if(this.totalRows % this.pageSize !==0){
      this.pageCount++;
    }

    this.paginationArray = [];
    for(let i = 1; i <=this.pageCount; i++){
      this.paginationArray.push(i);
    }
  }

  onPageClick(i: number){
    this.pageClickedEvent.emit(i);
  }

}
