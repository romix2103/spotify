import { Component, OnInit } from '@angular/core';
import { TracksModule } from '@modules/tracks/tracks.module';
import * as dataRaw from '../../../../data/tracks.json'
import { TrackModel } from 'src/app/core/models/tracks.model';
@Component({
  selector: 'app-tracks-page',
  templateUrl: './tracks-page.component.html',
  styleUrls: ['./tracks-page.component.css']
})
export class TracksPageComponent implements OnInit{
  mockTracksList: Array<TrackModel> =[
    
  ]
  ngOnInit(): void {
    const {data}: any=(dataRaw as any).default;
    console.log(data)
    this.mockTracksList = data;
  }
}
