import { UrediComponent } from './../uredi/uredi.component';
import { ImenikservisService } from './../service/imenikservis.service';
import { Imenik } from './../models/Imenik';
import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DodajComponent } from '../dodaj/dodaj.component';
import { Router, NavigationEnd } from '@angular/router';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { IzbrisiComponent } from '../izbrisi/izbrisi.component';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
declare let alertify: any;

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'app-TelefonImenik',
  templateUrl: './TelefonImenik.component.html',
  styleUrls: ['./TelefonImenik.component.css']
})
export class TelefonImenikComponent implements OnInit {

  korisnik = new Imenik();
  imeniks$: Observable<Imenik[]>;
  pretraga = '';
  imenici: Imenik[] = [];
  id: number;
  config: MatSnackBarConfig = {
    duration: 3000,
    panelClass: 'success'

  }
  constructor(private snackBar: MatSnackBar, private servis: ImenikservisService, private dialog: MatDialog, private router: Router) { }


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
          //this.router.navigate(['/']);
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
        }
        this.servis.updateImenik(result.data.imenikId, this.korisnik).subscribe((rezultat => {
          //this.router.navigate(['/']);
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
    this.imeniks$ = this.servis.getImeniks();
    this.imeniks$.subscribe(result => this.imenici = result);

  }

  trazi() {
    this.imeniks$.subscribe(result => {
      this.imenici = result;
      this.imenici = this.imenici.filter(x => {
        // tslint:disable-next-line: max-line-length
        var zamjena = x.broj.replace('/', '');
        // tslint:disable-next-line: max-line-length
        return (x.ime.toLowerCase().includes(this.pretraga.toLowerCase()) || (zamjena.toLowerCase().includes(this.pretraga.toLowerCase())) || x.adresa.toLowerCase().includes(this.pretraga.toLowerCase()));
      })
    });
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
