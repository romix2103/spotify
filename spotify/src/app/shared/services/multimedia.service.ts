import { EventEmitter, Injectable } from '@angular/core';
import { TrackModel } from '@core/models/tracks.model';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {
  callback: EventEmitter<any> = new EventEmitter<any>()
 myObservable1$: BehaviorSubject<any> = new BehaviorSubject('ok')

 public trackInfo$: BehaviorSubject<any> = new BehaviorSubject(undefined)
 public audio!: HTMLAudioElement 
 public timeElapsed$: BehaviorSubject<string> = new BehaviorSubject('00:00')
 public timeRemaining$: BehaviorSubject<string> = new BehaviorSubject('-00:00')
 public playerStatus$: BehaviorSubject<string> = new BehaviorSubject('paused')
 public playerPercentage$: BehaviorSubject<number> = new BehaviorSubject(0)

 
 constructor() {
    this.audio = new Audio()
    
    this.trackInfo$.subscribe(responseOk =>{
      if(responseOk){
        console.log("soy el audio", this.audio)
        this.setAudio(responseOk)
      }
      this.listenAllEvents()
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

   private listenAllEvents():void{
    this.audio.addEventListener('timeupdate' , this.calculateTime, false)
    this.audio.addEventListener('playing' , this.setPlayerSatus, false)
    this.audio.addEventListener('play' , this.setPlayerSatus, false)
    this.audio.addEventListener('pause' , this.setPlayerSatus, false)
    this.audio.addEventListener('ended' , this.setPlayerSatus, false)

  }

   private setTimeElapsed(currentTime: number):void{
      let seconds = Math.floor(currentTime % 60)
      let minutes = Math.floor((currentTime / 60) % 60)

      const displaySecond = (seconds < 10) ?  `0${seconds}` : seconds;
      const displayMinutes = (minutes < 10) ?  `0${minutes}` : minutes;

      const displayFormat = `${displayMinutes}:${displaySecond}`
      this.timeElapsed$.next(displayFormat)
    }
    private setTimeRemaining(currentTime: number, duration: number):void{
      let timeLeft = duration - currentTime
      
      let seconds = Math.floor(timeLeft % 60)
      let minutes = Math.floor((timeLeft / 60) % 60)

      const displaySecond = (seconds < 10) ?  `0${seconds}` : seconds;
      const displayMinutes = (minutes < 10) ?  `0${minutes}` : minutes;

      const displayFormat = `-${displayMinutes}:${displaySecond}`
      this.timeRemaining$.next(displayFormat)
    }
   private calculateTime = () => {
      console.log('Disparando evento')
      const {duration, currentTime} = this.audio
      //console.table([duration, currentTime])
      this.setTimeElapsed(currentTime)
      this.setTimeRemaining(currentTime, duration)
      this.setPercentage(currentTime, duration)
   }
   private setPlayerSatus = (state: any) => {
    console.log('status',state)
    switch (state.type){
        case 'play':
        this.playerStatus$.next('play')
        break
        
        case 'playing':
        this.playerStatus$.next('playing')
        break

        case 'ended':
        this.playerStatus$.next('ended')
        break

        default:
        this.playerStatus$.next('paused')
        break
    }
 }

 public togglePlayer():void{
  (this.audio.paused) ? this.audio.play() : this.audio.pause()
 }

 private setPercentage(currentTime: number, duration: number): void{
  let percentage = (currentTime*100)/duration
  this.playerPercentage$.next(percentage)
 }

 public seekAudio(percentage: number): void
  {
    const {duration} = this.audio
    const percentageToSecond = (percentage*duration)/100
    this.audio.currentTime = percentageToSecond
  }
}
