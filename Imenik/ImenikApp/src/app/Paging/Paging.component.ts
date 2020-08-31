import { Imenik } from './../models/Imenik';
import { JwPaginationModule } from 'jw-angular-pagination';

import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
// declare let paginate: any;
import paginate from 'jw-paginate';
import { ImenikservisService } from '../service/imenikservis.service';


@Component({
  // tslint:disable-next-line: component-selector
  //moduleId: module.id,
  // tslint:disable-next-line: component-selector
  selector: 'app-Paging',
  styleUrls: ['./Paging.component.scss'],
  templateUrl: './Paging.component.html',
})
export class PagingComponent implements OnInit {
  @Input() items = [];
  @Output() changePage = new EventEmitter<any>(true);
  @Input() initialPage = 1;
  @Input() totalItems: number;
  @Input() totalPages: number;
  pager: any = {};
  imeniks$: any;
  constructor(private servis: ImenikservisService) { }
  ngOnInit() {
    // set page if items array isn't empty
    if (this.items && this.items.length) {
      this.setPage(this.initialPage);
    }
  }
  // tslint:disable-next-line: use-lifecycle-interface
  ngOnChanges(changes: SimpleChanges) {
    if (this.items && changes.items) {
      // reset page if items array has changed
      console.log(changes.items.currentValue);
      if (changes.items.currentValue !== changes.items.previousValue) {
        this.setPage(this.initialPage);
      }
    }
  }
  public setPage(page: number) {
    console.log(this.servis.brojRedaka);
    if (this.totalItems === undefined) {
      return;
    }
    this.imeniks$ = this.servis.getImeniksTraziPage(this.servis.trazi, page, this.servis.brojRedaka);
    this.imeniks$.subscribe(result => {
      this.items = result.body;
      // get new pager object for specified page
      this.pager = paginate(this.totalItems, page, this.servis.brojRedaka, this.totalPages);
      console.log(this.pager);
      // get new page of items from items array
      let pageOfItems = this.items.slice(0, this.items.length + 1);
      // call change page function in parent component
      this.changePage.emit(pageOfItems);
    });
  }

}
