import { Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Subscription } from 'rxjs'; //TODO: Programacion reactiva!
import { TrackModel } from 'src/app/core/models/tracks.model';

@Component({
  selector: 'app-media-player',
  templateUrl: './media-player.component.html',
  styleUrls: ['./media-player.component.css']
})
export class MediaPlayerComponent implements OnInit {
  @ViewChild('progressBar') progressBar: ElementRef = new ElementRef('')
  listObservers$: Array<Subscription> = []
  state: string = 'paused'
  mockCover: TrackModel={
    cover:'',
    album:'Sarasa',
    name: 'Bebe',
    url:'https://i.scdn.co/image/ab67616d0000b27345ca41b0d2352242c7c9d4bc',
    _id: 1
  }
  ngOnInit(): void {

  }



}
