import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import{Observable, of} from 'rxjs'
import{catchError, map, mergeMap} from 'rxjs/operators'
import { environment } from 'src/environments/environment.development';
import { TracksModule } from '../tracks.module';
import { TrackModel } from '@core/models/tracks.model';

@Injectable({
  providedIn: 'root'
})
export class TracksService {
  private readonly URL = environment.api;
  constructor(private httpClient: HttpClient) { 
   }
   private skipById(listTracks: TrackModel[], id: number): Promise<TrackModel[]>{
    return new Promise((resolve, reject) =>{
      const listTmp = listTracks.filter(a => a._id != id)
      resolve(listTmp)
    })
   }

   getAllTracks$(): Observable<any>{
    console.log("hola soy la url", this.URL)
    return this.httpClient.get(`${this.URL}/tracks`)
    .pipe(
      map((dataRow: any) => {
        return dataRow.data
      })
    )
    //concatenar
   }
   getAllRandom$(): Observable<any>{
    console.log("trackService url", this.URL)
    return this.httpClient.get(`${this.URL}/tracks`)
    .pipe(
      mergeMap(({data}: any) => this.skipById(data, 1) 
      //,
      //map(({dataRevertida}: any) => {
        //return dataRevertida.filter((track: TrackModel)=> track._id != 1)
      //})
    ),
    //concatenar
    catchError((err)=>{
      console.log("algo paso", err)
      return of([])
    })
    )
   }
}
