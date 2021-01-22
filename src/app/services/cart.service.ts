import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ProductoModel } from '../models/producto.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private cart = new BehaviorSubject<Array<ProductoModel>>(null);
  public currentDataCart$ = this.cart.asObservable();

  constructor() { }

  public changeCart(newData: ProductoModel) {

    let listCart = this.cart.getValue();

    if(listCart)
    {

      let objIndex = listCart.findIndex((obj => obj.id == newData.id));

      if(objIndex != -1)
      {
      }

      else {
        listCart.push(newData);
      }  
    }

    else {
      listCart = [];
      listCart.push(newData);
    }

    this.cart.next(listCart);
  }

  public removeElementCart(newData:ProductoModel){

    let listCart = this.cart.getValue();

    let objIndex = listCart.findIndex((obj => obj.id == newData.id));
    if(objIndex != -1)
    {

      listCart.splice(objIndex,1);
    }

    this.cart.next(listCart);

  }

}
