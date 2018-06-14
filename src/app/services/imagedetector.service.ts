import { Injectable, isDevMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImagedetectorService {

  constructor(private httpClient: HttpClient) { }

  public detectFile(fileToUpload: File): Observable<any> {
    const endpoint = this.getEndpoint();
    const formData: FormData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);
    return (
      this.httpClient
        // .post(endpoint, formData, { headers:  })
        .post(endpoint, formData)
    );
  }
  public detectFileFake(fileToUpload: File): Observable<any> {
    return Observable.create((observer) => {
      // Yield a single value and complete
      observer.next({
        message: 'hello world',
        result: {
          text: 'Walmart\ntotal: $100\nDecember 17, 1995 03:24:00'
        }
      });
      observer.complete();

      // Any cleanup logic might go here
      return () => {
        console.log('disposed');
      };
    });
  }

  private getEndpoint() {
    // if (isDevMode()) {
    //   return 'http://localhost:5001/bookingpreneur/us-central1/receiptdetector';
    // }

    return environment.receiptDetectorFunctionUrl;
  }
}
