import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';
import { Observable, Subject } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { TrackModel } from '@core/models/tracks.model';
import { TracksService } from '@modules/tracks/services/tracks.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private readonly URL = environment.api
  private dataTracks: Array<TrackModel> = []
  constructor(private httpClient: HttpClient, private cookie: CookieService, private trackService: TracksService) { 
  }
  private sessionToken = this.cookie.get('token')
  private dataUpdated = new Subject<void>()
  dataUpdated$ = this.dataUpdated.asObservable()
  
  AbmSong(name: string, album: string, cover: string, artist: string, id: string): Observable<any> {
    const body = {
      name,
      album,
      cover,
      artist
    }
   
    const headers = new HttpHeaders({'authorization' : `Bearer ${this.sessionToken}`})

    if(id == ''){
      //alert("voy a insertar")

      return this.httpClient.post(`${this.URL}/tracks/add`, body, {headers})
    }else{

      return this.httpClient.put(`${this.URL}/tracks/edit/` + id, body, {headers})
    }
     
    
  }
  async loadDataAll():Promise<any>{
    this.dataTracks = await this.trackService.getAllTracks$().toPromise()
    console.log("los tracks de la seccion admin service son:", this.dataTracks )
  }
  triggerUpdate(){
    console.log("pase por el trigger")
    this.loadDataAll()
  }
  deleteSong(uid: string){
    const headers = new HttpHeaders({'authorization' : `Bearer ${this.sessionToken}`})

    return this.httpClient.delete(`${this.URL}/tracks/delete/` + uid, {headers})
  }
}
