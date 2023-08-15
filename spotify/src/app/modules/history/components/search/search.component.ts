import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  src: string = ''
  @Output() callbackData: EventEmitter<any> = new EventEmitter()
  constructor(){}
  ngOnInit(): void {
    
  }
  callSearch(term: string):void{
    if(term.length > 2){
      this.callbackData.emit(term)
      console.log(this.src, term)
    }
    if(term.length == 0){
      this.callbackData.emit(term)
      console.log(this.src, term)
    }
  }
}
