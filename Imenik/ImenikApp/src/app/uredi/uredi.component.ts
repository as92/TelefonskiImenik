import { Observable } from 'rxjs';
import { Component, OnInit, Inject } from '@angular/core';
import { Imenik } from '../models/Imenik';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImenikservisService } from '../service/imenikservis.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Zupanija } from '../models/zupanije';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-uredi',
  templateUrl: './uredi.component.html',
  styleUrls: ['./uredi.component.css']
})
export class UrediComponent implements OnInit {
  korisnik = new Imenik();
  korisnikId: number;
  korisnik$: Observable<Imenik>;
  zupanije: Zupanija[] = [];
  pozivni1 = '';
  pozivni2 = '';
  public forma: FormGroup;
  // tslint:disable-next-line: max-line-length
  constructor(@Inject(MAT_DIALOG_DATA) data, private dialogRef: MatDialogRef<UrediComponent>, private formBuilder: FormBuilder, private servis: ImenikservisService, private router: Router) {
    // const idParam = 'id';
    // if (this.avRoute.snapshot.params[idParam]) {
    //   this.korisnikId = this.avRoute.snapshot.params[idParam];
    // }
    this.korisnikId = data;
  }

  ngOnInit() {

    this.zupanije = this.servis.zupanije;
    this.servis.getImenik(this.korisnikId).subscribe(result => {
      this.korisnik = result;
      const izrizano = result.broj.split('/');
      this.pozivni1 = izrizano[0];
      this.pozivni2 = izrizano[1];
    });

    const numericRegex = '^[0-9]*$';
    this.zupanije = this.servis.zupanije;
    this.forma = this.formBuilder.group({
      ime: ['', [Validators.required, Validators.maxLength(30)]],
      odabir: ['', [Validators.required]],
      broj: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(7), Validators.pattern(numericRegex)]],
      adresa: ['', [Validators.required, Validators.maxLength(100)]]
    });

    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === 'Escape') {
        this.zatvori();
      }
    });

    this.dialogRef.backdropClick().subscribe(event => {
      this.zatvori();
    });
  }
  hasError = (controlName: string, errorName: string) => {
    return this.forma.controls[controlName].hasError(errorName);
  }
  uredi() {

    this.korisnik.broj = this.pozivni1 + '/' + this.pozivni2;
    this.dialogRef.close({ event: 'close', data: this.korisnik });

  }
  zatvori() {

    this.dialogRef.close({ event: 'Cancel' });
  }
}
