import { UrediComponent } from './../uredi/uredi.component';
import { ImenikservisService } from './../service/imenikservis.service';
import { Imenik } from './../models/Imenik';
import { Observable } from 'rxjs';
import { Component, OnInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DodajComponent } from '../dodaj/dodaj.component';
import { Router, NavigationEnd } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { IzbrisiComponent } from '../izbrisi/izbrisi.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { HttpClient, HttpResponse, HttpEvent } from '@angular/common/http';
declare let alertify: any;

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-TelefonImenik',
  templateUrl: './TelefonImenik.component.html',
  styleUrls: ['./TelefonImenik.component.css']
})
export class TelefonImenikComponent implements OnInit {

  korisnik = new Imenik();
  header: Array<any>;
  totalCount: number;
  totalPages: number;
  red = [5, 10, 15, 20];
  brojRedaka = 10;
  obj: JSON;
  imeniks$: Observable<HttpResponse<Imenik[]>>;
  pretraga = '';
  items = [];
  pageOfItems: Array<any>;
  currentPage = 1;
  imenici: Imenik[] = [];
  id: number;
  config: MatSnackBarConfig = {
    duration: 3000,
    panelClass: 'success'

  };
  // @ViewChild(MatPaginator) paginator: MatPaginator;

  // tslint:disable-next-line: max-line-length
  constructor(private http: HttpClient, private snackBar: MatSnackBar, private servis: ImenikservisService, private dialog: MatDialog, private router: Router) { }


  openDialogDodaj(): void {
    const dialogRef = this.dialog.open(DodajComponent, {
      width: '600px',
      height: '500px'

    });

    dialogRef.afterClosed().subscribe(result => {

      if (result.event === 'close') {
        this.korisnik = {
          ime: result.data.ime,
          broj: result.data.broj.toString(),
          adresa: result.data.adresa
        };

        this.servis.saveImenik(this.korisnik).subscribe((rezultat => {
          // this.router.navigate(['/']);
          this.ngOnInit();
          this.snackBar.open('Korisnik je dodan!', '', this.config);
        }));

      }
    });
  }

  openDialogUredi(id): void {
    const dialogRef = this.dialog.open(UrediComponent, {
      width: '600px',
      height: '500px',
      data: id

    });
    dialogRef.afterClosed().subscribe(result => {

      if (result.event === 'close') {

        this.korisnik = {
          imenikId: result.data.imenikId,
          ime: result.data.ime,
          broj: result.data.broj.toString(),
          adresa: result.data.adresa
        };
        this.servis.updateImenik(result.data.imenikId, this.korisnik).subscribe((rezultat => {
          // this.router.navigate(['/']);
          this.ngOnInit();
          this.snackBar.open('Korisniku su izmijenjeni podaci!', '', this.config);
        }));
      }

    });
  }
  openDialogIzbrisi(id): void {
    const dialogRef = this.dialog.open(IzbrisiComponent, {
      width: '300px',
      height: '200px',
      data: id

    });
    dialogRef.afterClosed().subscribe(result => {

      if (result.event === 'close') {
        this.servis.deleteImenik(id).subscribe((data) => {
          this.ngOnInit();
          alertify.set('notifier', 'position', 'bottom-center');
          alertify.success('Korisnik je izbrisan!');
        });
      }
    });
  }

  ngOnInit() {
    this.servis.trazi = 'default';
    this.imeniks$ = this.servis.getImeniks(this.currentPage);
    this.imeniks$.subscribe(result => {
      this.imenici = result.body,
        this.header = result.headers.getAll('paging-headers'),
        this.obj = JSON.parse(this.header[0]),
        this.totalCount = this.obj['totalCount'],
        this.totalPages = this.obj['totalPages'];
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
          this.totalPages = this.obj['totalPages'];
      });
    }



  }
  // bug je kad pretražin po broju npr, pa minjan broj redaka, više redaka izbacuje
  promjenibrojRedaka() {
    this.servis.brojRedaka = this.brojRedaka;
    if (this.pretraga === '') {
      this.servis.trazi = 'default';
    }
    this.imeniks$ = this.servis.getImeniks(this.currentPage);
    this.imeniks$.subscribe(result => {
      this.imenici = result.body,
        this.header = result.headers.getAll('paging-headers'),
        this.obj = JSON.parse(this.header[0]),
        this.totalCount = this.obj['totalCount'],
        this.totalPages = this.obj['totalPages'];
    });

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
          this.totalPages = this.obj['totalPages'];
      }
      else {
        alertify.set('notifier', 'position', 'bottom-center');
        alertify.error('Nije pronađen nijedan korisnik s unesenim podacima!');
        this.ngOnInit();
      }

    });

    // this.imenici = result.body;
    // this.imenici = this.imenici.filter(x => {
    //   // tslint:disable-next-line: max-line-length
    //   const zamjena = x.broj.replace('/', '');
    //   // tslint:disable-next-line: max-line-length
    //  //  tslint:disable-next-line: max-line-length
    //   return (x.ime.toLowerCase().includes(this.pretraga.toLowerCase()) || (zamjena.toLowerCase().includes(this.pretraga.toLowerCase())) || x.adresa.toLowerCase().includes(this.pretraga.toLowerCase()));

  }
  // izbrisi(i) {
  //   this.id = Number(i);
  //   const ans = confirm('Želite li izbrisati korisnika s id-jem: ' + this.id);
  //   if (ans) {
  //     this.servis.deleteImenik(this.id).subscribe((data) => {
  //       this.ngOnInit();
  //     });
  //   }
  // }
}
