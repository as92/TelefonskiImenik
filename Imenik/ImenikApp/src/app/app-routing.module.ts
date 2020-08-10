import { BazaKorisnikaComponent } from './BazaKorisnika/BazaKorisnika.component';
import { TelefonImenikComponent } from './TelefonImenik/TelefonImenik.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


const routes: Routes = [
  { path: '', component: TelefonImenikComponent, pathMatch: 'full' },
  { path: 'admin', component: TelefonImenikComponent },
  { path: 'korisnici', component: BazaKorisnikaComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
