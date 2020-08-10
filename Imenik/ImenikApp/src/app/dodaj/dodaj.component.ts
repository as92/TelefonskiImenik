import { Zupanija } from './../models/zupanije';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImenikservisService } from '../service/imenikservis.service';
import { Imenik } from '../models/Imenik';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-dodaj',
  templateUrl: './dodaj.component.html',
  styleUrls: ['./dodaj.component.css']
})
export class DodajComponent implements OnInit {
  korisnik = new Imenik();
  public forma: FormGroup;
  ime = '';
  broj = '';
  defaultBroj = '+385';
  odaberi = '';
  adresa = '';
  zupanije: Zupanija[] = [];
  constructor(private dialogRef: MatDialogRef<DodajComponent>, private servis: ImenikservisService, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
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

  dodaj() {
    this.korisnik.ime = this.ime;
    this.korisnik.broj = this.odaberi + '/' + this.broj;
    this.korisnik.adresa = this.adresa;
    this.dialogRef.close({ event: 'close', data: this.korisnik });

  }

  zatvori() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}

