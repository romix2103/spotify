import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { map } from 'rxjs/operators';
import { CookieService } from 'ngx-cookie-service';


@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly URL = environment.api
  private sessionToken = this.cookie.get('token')

  constructor(private http: HttpClient, private cookie: CookieService) { }
  searchTracks$(term: string): Observable<any>{
    const headers = new HttpHeaders({'authorization' : `Bearer ${this.sessionToken}`})

    return this.http.get(`${this.URL}/tracks/${term}`, {headers}).pipe(
      map((dataRaw: any) => 
      dataRaw.data),
      
    )
  }
}
