import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { ProductoModel } from '../../models/producto.model';
import { CartService } from '../../services/cart.service';
import { HeaderModel } from '@app/models/header.model';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  header: HeaderModel = new HeaderModel();
  producto: ProductoModel[] = [];
  cargando = false;


  constructor(private productoService: ProductoService, private _cartService: CartService) { }


  ngOnInit() {

    this.cargando = true;
    this.productoService.getProducto(this.header)
      .subscribe(resp => {
        console.log(resp[2]);
        
        this.producto[2] = resp[2];
        console.log(this.producto[2]);
        this.cargando = false;
      });

  }

  borrarProducto(producto: ProductoModel, i: number) {

    Swal.fire({
      title: '¿Está seguro?',
      text: `Está seguro que desea borrar a ${producto.descripcion}`,
      type: 'question',
      showConfirmButton: true,
      showCancelButton: true
    }).then(resp => {

      if (resp.value) {
        this.producto.splice(i, 1);
        this.productoService.borrarProducto(producto.id).subscribe();
      }
    });
  }

  AnadirCarrito(producto: ProductoModel) {
    this._cartService.changeCart(producto);
    
  }


}
