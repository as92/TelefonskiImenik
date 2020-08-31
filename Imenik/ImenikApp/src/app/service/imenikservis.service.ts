import { Imenik } from './../models/Imenik';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError, tap, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Zupanija } from '../models/zupanije';
//import * as alertify;
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class ImenikservisService {

  trazi = 'default';
  brojRedaka = 10;
  myAppUrl: string;
  myApiImenikUrl: string;
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };

  constructor(private http: HttpClient) {
    this.myAppUrl = environment.appUrl;
    this.myApiImenikUrl = 'api/TelefonskiImeniks';
  }
  zupanije =
    [{
      ime: 'Grad Zagreb i Zagrebačka županija',
      pozivni: '01'
    }
      ,
    {
      ime: 'Dubrovačko-neretvanska županija',
      pozivni: '020'
    },
    {
      ime: 'Splitsko- dalmatinska županija',
      pozivni: '021'
    }
      ,
    {
      ime: 'Šibensko-kninska županija',
      pozivni: '022'
    },
    {
      ime: 'Varaždinska županija',
      pozivni: '042'
    }
      ,
    {
      ime: 'Osječko-baranjska županija',
      pozivni: '031'
    },
    {
      ime: 'Vukovarsko-srijemska županija',
      pozivni: '032'
    }
      ,
    {
      ime: 'Virovitičko-podravska županija',
      pozivni: '033'
    },
    {
      ime: 'Brodsko-posavska županija',
      pozivni: '035'
    },
    {
      ime: 'Međimurska županija',
      pozivni: '040'
    }
      ,
    {
      ime: 'Bjelovarsko-bilogorska županija',
      pozivni: '043'
    },
    {
      ime: 'Sisačko-moslavačka županija',
      pozivni: '044'
    }
      ,
    {
      ime: 'Karlovačka županija',
      pozivni: '047'
    },
    {
      ime: 'Koprivničko-križevačka županija',
      pozivni: '048'
    }
      ,
    {
      ime: 'Krapinsko-zagorska županija',
      pozivni: '049'
    },
    {
      ime: 'Primorsko-goranska županija',
      pozivni: '051'
    },
    {
      ime: 'Istarska županija',
      pozivni: '040'
    }
      ,
    {
      ime: 'Ličko-senjska županija',
      pozivni: '053'
    }
    ];

  //?pageNumber=2 & pageSize=2
  getImeniks(pagenumber: number) {
    // tslint:disable-next-line: max-line-length
    return this.http.get<Imenik[]>((this.myAppUrl + this.myApiImenikUrl + '?PageNumber=' + pagenumber), { observe: 'response' })
      .pipe(
        retry(1),
        catchError(this.errorHandler)

      );
  }

  getImeniksTrazi(trazi: string) {
    // tslint:disable-next-line: max-line-length
    return this.http.get<Imenik[]>((this.myAppUrl + this.myApiImenikUrl + '?Trazi=' + trazi), { observe: 'response' })
      .pipe(
        retry(1),
        catchError(this.errorHandler)

      );
  }
  getImeniksTraziPage(trazi: string, pagenumber: number, pagesize: number) {
    // tslint:disable-next-line: max-line-length
    return this.http.get<Imenik[]>((this.myAppUrl + this.myApiImenikUrl + '?PageNumber=' + pagenumber + '&' + 'Trazi=' + trazi + '&' + 'PageSize=' + pagesize), { observe: 'response' })
      .pipe(
        retry(1),
        catchError(this.errorHandler)

      );
  }
  // getImeniks(pagenumber: number, pagesize: number): Observable<Imenik[]> {
  //   return this.http.get<Imenik[]>(this.myAppUrl + this.myApiImenikUrl + '?pageNumber=' + pagenumber + '&' + 'pageSize=' + pagesize)
  //     .pipe(
  //       retry(1),
  //       catchError(this.errorHandler)
  //     );
  // }

  getImenik(imenikId: number): Observable<Imenik> {
    return this.http.get<Imenik>(this.myAppUrl + this.myApiImenikUrl + '/' + imenikId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }


  saveImenik(imenik): Observable<Imenik> {
    return this.http.post<Imenik>(this.myAppUrl + this.myApiImenikUrl, JSON.stringify(imenik), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
  updateImenik(imenikId: number, imenik): Observable<Imenik> {
    // tslint:disable-next-line: max-line-length
    return this.http.put<Imenik>(this.myAppUrl + this.myApiImenikUrl + '/' + imenikId, JSON.stringify(imenik), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }
  deleteImenik(imenikId: number): Observable<Imenik> {
    return this.http.delete<Imenik>(this.myAppUrl + this.myApiImenikUrl + '/' + imenikId)
      .pipe(
        retry(1),
        catchError(this.errorHandler)
      );
  }

  pretrazi(trazi: string) {
    this.trazi = trazi;
  }


  errorHandler(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    alertify.set('notifier', 'position', 'top-center');
    alertify.error(error.error.message + '<br>Molimo pokušajte ponovno!');
    return throwError(error.error.message);
  }


}
