import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrackModel } from 'src/app/core/models/tracks.model';
import { TracksService } from '@modules/tracks/services/tracks.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit, OnDestroy{
  mockTracksList: Array<TrackModel> =[
    
  ]
  listObserver$: Array<Subscription> = []
  tracksTrending: Array<TrackModel> = []
  tracksRandom: Array<TrackModel> = []
  constructor(private trackService: TracksService){}
  ngOnInit(): void {
   this.loadDataAll()
   this.loadDataRandom()
  
  }
  async loadDataAll():Promise<any>{
    this.tracksTrending = await this.trackService.getAllTracks$().toPromise()
    this.tracksRandom = await this.trackService.getAllRandom$().toPromise()
    //console.log("Promesa", dataRow)
  }
  loadDataRandom():void{
    this.trackService.getAllRandom$().subscribe(response =>{
      this.tracksRandom = response 
      console.log("Respuesta de data?" , response)
     })
  }
  ngOnDestroy(): void {
  }
}
