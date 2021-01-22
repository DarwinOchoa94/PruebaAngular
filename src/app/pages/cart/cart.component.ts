import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../../services/cart.service';
import { ProductoModel } from '../../models/producto.model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public items: Array<ProductoModel>
  public totalPrice:number = 0;
  public totalQuantity:number = 0;
  constructor(private _cartService:CartService) { }

  ngOnInit() {
    console.log("Componente Cart");
    this._cartService.currentDataCart$.subscribe(x=>{
      if(x)
      {
        this.items = x;
        this.totalQuantity = x.length;
        this.totalPrice = x.reduce((sum, current) => sum + (current.precio + current.precio), 0);
        //this.totalPrice = x.reduce((sum, current) => sum + (current.precio * current.cantidad), 0);
      }
    })
  }

  public remove(producto:ProductoModel)
  {
    this._cartService.removeElementCart(producto);
  }
  

}
