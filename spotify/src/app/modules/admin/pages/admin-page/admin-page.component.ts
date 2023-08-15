import { Component, OnInit } from '@angular/core';
import { TracksService } from '@modules/tracks/services/tracks.service';
import { TrackModel } from 'src/app/core/models/tracks.model';
import {FormControl, FormGroup, Validators} from '@angular/forms'
import { AdminService } from '@shared/services/admin.service';
import{CookieService} from 'ngx-cookie-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  formCanciones: FormGroup = new FormGroup({})
  optionSort:{property: string | null, order: string} = {property: null, order: 'asc'}
  cancion: string = ''
  album: string = ''
  cover: string = ''
  artist?: string = ''
  idSong: string = ''
  tracksTrending: Array<TrackModel> = []
  mostrarLoading: boolean = true
  mostrarTracks: boolean = false

 
  constructor(private asAdminService: AdminService, private trackService: TracksService, private cookie: CookieService, public router: Router){
    // if(this.cookie.get('rol') != "admin"){
    //   this.cookie.set('token', '', 1, '/')

    //   //this.router.navigate(['/auth/login'])
    // }
    //console.log("soy la cookie del admin", this.cookie.get('token'))
  }
  ngOnInit(): void {
    this.formCanciones = new FormGroup({
      cancion: new FormControl('',[
        Validators.required,
        ]),
        album: new FormControl('', [
        Validators.required,
        
      ]),
      artist: new FormControl('', [
        Validators.required,
        
      ]),
      cover: new FormControl('', [
        Validators.required,
        
      ]),
      idSong: new FormControl('', [
        
        
      ]),
    }
      
    )
    //esta lógica debe estar en un guard
    if(this.cookie.get('rol') != "admin"){
      this.cookie.set('token', '', 1, '/')

      this.router.navigate(['/auth/login'])
    }
    this.loadDataAll()
    
   }
   sendAbm():void{
    const{cancion, album, artist, cover, idSong} = this.formCanciones.value
    console.log("estas son las canciones a guardar" , this.formCanciones.value)
    this.mostrarLoading = true
    this.mostrarTracks = false
    this.asAdminService.AbmSong(cancion, album, cover, artist, idSong)
    .subscribe({
      next: (v) => {
        this.loadDataAll()
        this.clearInputs()
        console.log("Di de alta una cancion", v)
        this.mostrarLoading = false
        this.mostrarTracks = true
                
      },
      error: (e) => {
        this.loadDataAll()
        console.log("error al dar de alta una canción", e)
       
      },
      complete: () => {
        this.loadDataAll()
        this.clearInputs()
        this.mostrarLoading = false
        this.mostrarTracks = true
        //alert("completo")
      }
  })
  
  }
  changeSort(property: string): void{
    const {order} = this.optionSort
    this.optionSort = {
      property,
      order: order === 'asc' ? 'desc' : 'asc'
    }

  }
  async loadDataAll():Promise<any>{
    //this.dataTracks = await this.trackService.loadDataAll()
     this.tracksTrending = await this.trackService.getAllTracks$().toPromise()
     this.mostrarLoading = false
     this.mostrarTracks = true
    console.log("los tracks de la seccion son:", this.tracksTrending)
  }
  submitForm(){
    this.loadDataAll()
  }
  fillInputs(track: TrackModel){
    console.log("soy el uid", track)
    this.cancion = track.name
    this.album = track.album
    this.artist = track.artist
    this.cover = track.cover
    this.idSong = track.uid
  }
  deleteTrack(track: TrackModel){
    this.mostrarLoading = true
    this.mostrarTracks = false
    console.log("la cancion a eliminar es",track.uid)
    this.asAdminService.deleteSong(track.uid)
    .subscribe({
      next: (v) => {
        this.loadDataAll()
        console.log("Eliminé", v)
        this.clearInputs()
        this.mostrarLoading = false
        this.mostrarTracks = true
      },
      error: (e) => {
        this.loadDataAll()
        console.log("Error al eliminar", e)
       
      },
      complete: () => {
        console.log("Completó")
        this.loadDataAll()
        this.clearInputs()
        this.mostrarLoading = false
        this.mostrarTracks = true
        //alert("completo")
      }
  })
}
clearInputs(){
  
  this.cancion = ''
  this.album = ''
  this.artist = ''
  this.cover = ''
  this.idSong = ''
}
}
