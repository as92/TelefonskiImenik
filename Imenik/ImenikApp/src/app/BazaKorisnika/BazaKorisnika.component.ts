import { Component, OnInit } from '@angular/core';
import { ImenikservisService } from './../service/imenikservis.service';
import { Imenik } from './../models/Imenik';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-BazaKorisnika',
  templateUrl: './BazaKorisnika.component.html',
  styleUrls: ['./BazaKorisnika.component.css']
})
export class BazaKorisnikaComponent implements OnInit {
  imeniks$: Observable<Imenik[]>;
  pretraga = '';
  imenici: Imenik[] = [];

  constructor(private servis: ImenikservisService) { }

  ngOnInit() {
    this.imeniks$ = this.servis.getImeniks();
    // this.imeniks$.subscribe(result => this.imenici = result);
  }

  trazi() {
    if (this.pretraga !== '') {
      this.imeniks$.subscribe(result => {
        this.imenici = result;
        this.imenici = this.imenici.filter(x => {
          var zamjena = x.broj.replace('/', '');
          // tslint:disable-next-line: max-line-length
          return (x.ime.toLowerCase().includes(this.pretraga.toLowerCase()) || (zamjena.toLowerCase().includes(this.pretraga.toLowerCase())) || x.adresa.toLowerCase().includes(this.pretraga.toLowerCase()));
        })
      });
    }
    else {
      this.imenici = [];
    }
  }

}
