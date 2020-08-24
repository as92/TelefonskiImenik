import { Component, OnInit } from '@angular/core';
import { ImenikservisService } from './../service/imenikservis.service';
import { Imenik } from './../models/Imenik';
import { Observable } from 'rxjs';
import { HttpResponse } from '@angular/common/http';
declare let alertify: any;

@Component({
  selector: 'app-BazaKorisnika',
  templateUrl: './BazaKorisnika.component.html',
  styleUrls: ['./BazaKorisnika.component.css']
})
export class BazaKorisnikaComponent implements OnInit {
  header: Array<any>;
  totalCount: number;
  totalPages: number;
  pageOfItems: Array<any>;
  imeniks$: Observable<HttpResponse<Imenik[]>>;
  pretraga = '';
  imenici: Imenik[] = [];
  currentPage = 1;
  obj: JSON;

  constructor(private servis: ImenikservisService) { }

  ngOnInit() {
    this.imeniks$ = this.servis.getImeniks(this.currentPage);
    this.imeniks$.subscribe(result => {
      this.imenici = result.body,
        this.header = result.headers.getAll('paging-headers'),
        this.obj = JSON.parse(this.header[0]),
        this.totalCount = this.obj['totalCount'],
        this.totalPages = this.obj['totalPages']
    });
  }

  prikaziSve() {
    if (this.pretraga === '') {
      this.servis.trazi = 'default';
      this.imeniks$ = this.servis.getImeniks(1);
      this.imeniks$.subscribe(result => {
        this.imenici = result.body,
          this.header = result.headers.getAll('paging-headers'),
          this.obj = JSON.parse(this.header[0]),
          this.totalCount = this.obj['totalCount'],
          this.totalPages = this.obj['totalPages']
      });
    }
  }

  onChangePage(pageOfItems: []) {
    // update current page of items
    this.pageOfItems = pageOfItems;
  }

  trazi() {
    this.servis.trazi = this.pretraga;
    this.imeniks$ = this.servis.getImeniksTrazi(this.pretraga);
    this.imeniks$.subscribe(result => {
      if (result.body.length > 0) {
        this.imenici = result.body,
          this.header = result.headers.getAll('paging-headers'),
          this.obj = JSON.parse(this.header[0]),
          this.totalCount = this.obj['totalCount'],
          this.totalPages = this.obj['totalPages']
      }
      else {
        alertify.set('notifier', 'position', 'bottom-center');
        alertify.error('Nije pronađen nijedan korisnik s unesenim podacima!');
      }

    });
    if (this.totalCount === 0) {
      this.ngOnInit();
    }
  }

}
