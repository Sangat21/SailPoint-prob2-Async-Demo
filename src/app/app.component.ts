import { Component } from '@angular/core';
import {Book} from './app-model';
import {MyServService} from "../services/my-serv.service"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

    // will store full book details
    myResponse: Book[] = [];

  constructor(private bookService: MyServService){
      this.getBookList();
  }


  getBookList(){
    this.bookService.getBookList()
    .subscribe(
        (response) => { // service call passed
          response.forEach(async book => {
              // get title using bookId
              const titleRes = await this.bookService.getBookTitle(book.bookId).toPromise();
              // get author using bookId
              const authorRes = await this.bookService.getBookAuthor(book.bookId).toPromise();
              // make new Book
              let newBook = new Book(book.bookId, titleRes.title, authorRes.author);
              this.myResponse.push(newBook); // push to myResponse
          });
        },
        (error) => { // service call failed
          console.error('Error: ', error);
        }
    );
  }

}
