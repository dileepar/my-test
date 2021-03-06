import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-staff',
  templateUrl: './staff.component.html',
  styleUrls: ['./staff.component.css']
})
export class StaffComponent implements OnInit {

  staff: any;
  totalRows: number;
  page: number = 1;
  searchText: string = '';
  sortDirection: string = 'asc';
  sortProperty: string = 'empNumber';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getStaff();
  }

  onPageClicked(page){
    this.page = page;
    this.getStaff();
  }

  onSearchTextChange(searctText: string){
    this.searchText = searctText;
    this.getStaff();
  }

  onSortClicked(sortProperty: string){
    this.sortProperty = sortProperty;
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.getStaff();
  }

  getStaff(){
    const params = new HttpParams()
      .set('page', this.page.toString())
      .set('searchText', this.searchText)
      .set('sortProperty', this.sortProperty)
      .set('sortDirection', this.sortDirection);

    this.http.get('http://localhost:50723/api/staff', {params : params})
    .subscribe(response => {
      this.staff = response;
      this.totalRows = this.staff[0].TotalRows;
    },error => {
      console.log(error);
    })
  }
}
