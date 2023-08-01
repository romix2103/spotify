import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MultimediaService } from '@shared/services/multimedia.service';

import { Subscription } from 'rxjs'; //TODO: Programacion reactiva!
import { TrackModel } from 'src/app/core/models/tracks.model';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit, OnDestroy {
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('')
  listObservers$: Array<Subscription> = []
  state: string = 'paused'
  mockCover!: TrackModel;
  constructor(public multimediaService : MultimediaService){}
  ngOnInit(): void {
    // this.multimediaService.trackInfo$.subscribe(res =>{
    //   console.log("debo reproducir esta cancion", res)
    // })
  }
  ngOnDestroy(): void {
    this.listObservers$.forEach(u => u.unsubscribe())
  }


}
