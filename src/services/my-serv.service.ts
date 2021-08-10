import { Injectable } from '@angular/core';
import {Book} from '../app/app-model';
import { map, catchError } from 'rxjs/operators';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

const apiUrl = "mySuperFakeApiUrl:8888";

@Injectable({
  providedIn: 'root'
})
export class MyServService {

  constructor(private http: HttpClient) {}

  // get book Ids
  getBookList(): Observable<Book[]> {
    return this.http.get<Book[]>((apiUrl + '/book/list'))
        .pipe(map((res) => {
            return res;
        }));
  }

  // get book title based on Id
  getBookTitle(id: number): Observable<Book>{
      return this.http.get<Book>((apiUrl + '/book/' + id + '/title'))
      .pipe(map((res) => res));
  }

  // get book author based on Id
  getBookAuthor(id: number): Observable<Book>{
      return this.http.get<Book>((apiUrl + '/book/' + id + '/author'))
      .pipe(map((res) => res));
  }

}
