import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title='';
  name:string='Romina'
  age: number = 35
  prhone: null = null
  phone1: undefined = undefined
  car: CarModel ={
    brand:'Ford',
    model:'Focus',
    year: 2021
  }
  listCars: Array<CarModel> =[
    {
      brand:'Chevrolet',
      model:'Camaro',
      year: 2021
    },
    {
      brand:'BMW',
      model:'AMG 200',
      year: 2021
    }
  ]    
  
}
interface CarModel{
  brand:string;
  model:string;
  year:number;
}
