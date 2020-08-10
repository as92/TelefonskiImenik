import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImenikservisService } from './../service/imenikservis.service';

@Component({
  selector: 'app-izbrisi',
  templateUrl: './izbrisi.component.html',
  styleUrls: ['./izbrisi.component.css']
})
export class IzbrisiComponent implements OnInit {
  // tslint:disable-next-line: max-line-length
  constructor(private servis: ImenikservisService, @Inject(MAT_DIALOG_DATA) public data, private dialogRef: MatDialogRef<IzbrisiComponent>) {
  }

  ngOnInit() {

    this.dialogRef.keydownEvents().subscribe(event => {
      if (event.key === 'Escape') {
        this.zatvori();
      }
    });
    this.dialogRef.backdropClick().subscribe(event => {
      this.zatvori();
    });

  }
  izbrisi() {
    this.dialogRef.close({ event: 'close' });
  }

  zatvori() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
