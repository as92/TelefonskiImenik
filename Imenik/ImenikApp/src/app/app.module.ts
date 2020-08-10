
import { ImenikservisService } from './service/imenikservis.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TelefonImenikComponent } from './TelefonImenik/TelefonImenik.component';
import { HttpClientModule } from '@angular/common/http';
import { DodajComponent } from './dodaj/dodaj.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule, MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { UrediComponent } from './uredi/uredi.component';
import { IzbrisiComponent } from './izbrisi/izbrisi.component';
import { MatCardModule } from '@angular/material/card';
import { BazaKorisnikaComponent } from './BazaKorisnika/BazaKorisnika.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';



@NgModule({
   declarations: [
      AppComponent,
      TelefonImenikComponent,
      DodajComponent,
      UrediComponent,
      IzbrisiComponent,
      BazaKorisnikaComponent
   ],
   imports: [
      //tslint:disable-next-line:indent,
      BrowserModule,
      //tslint:disable-next-line:indent,
      AppRoutingModule,
      HttpClientModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      MatDialogModule,
      MatTableModule,
      MatDialogModule,
      MatFormFieldModule,
      MatInputModule,
      MatButtonModule,
      MatSelectModule,
      MatCardModule,
      MatSnackBarModule

   ],
   entryComponents: [
      DodajComponent,
      UrediComponent
   ],
   providers: [
      ImenikservisService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
