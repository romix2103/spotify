import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {
  callback: EventEmitter<any> = new EventEmitter<any>()
 myObservable1$: BehaviorSubject<any> = new BehaviorSubject('ok')

 public trackInfo$: BehaviorSubject<any> = new BehaviorSubject('')
 public audio!: HTMLAudioElement 
  constructor() {
    this.audio = new Audio()
    
    this.trackInfo$.subscribe(responseOk =>{
      if(responseOk){
        console.log("soy el audio", this.audio)
        this.setAudio(responseOk)
      }
      
    })
    //this.myObservable1$.next("ok")
    // this.myObservable1$ = new Observable(
    //   (observer: Observer<any>) =>{
    //     // //observer.next('ok observer')
    //     // //se completo, el resto de los eventos se suspenden
    //     // setTimeout(() =>{
    //     //   observer.complete()
    //     // }, 1500)

    //     // setTimeout(() =>{
    //     //   observer.next("ok")
    //     // }, 2500)

    //     // //el flujo deja de funcionar
    //     // setTimeout(() =>{
    //     //   observer.error("ok")
    //     // }, 3500)
    //   }
    //)
   }

   public setAudio(track: TrackModel): void{
    
    this.audio.src = track.url
    console.log(this.audio.src , "set audio")
    this.audio.play()
   }
}
