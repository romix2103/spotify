import { EventEmitter, Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MultimediaService {
  callback: EventEmitter<any> = new EventEmitter<any>()
 myObservable1$: Observable<any> = new Observable()
  constructor() {
    this.myObservable1$ = new Observable(
      (observer: Observer<any>) =>{
        //observer.next('ok observer')
        //se completo, el resto de los eventos se suspenden
        setTimeout(() =>{
          observer.complete()
        }, 1500)

        setTimeout(() =>{
          observer.next("ok")
        }, 2500)

        //el flujo deja de funcionar
        setTimeout(() =>{
          observer.error("ok")
        }, 3500)
      }
    )
   }
}
