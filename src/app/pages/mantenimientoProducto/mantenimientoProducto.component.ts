import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

import { ProductoModel } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-mantenimientoProducto',
  templateUrl: './mantenimientoProducto.component.html',
  styleUrls: ['./mantenimientoProducto.component.css']
})
export class MantenimientoProductoComponent implements OnInit {

  producto: ProductoModel = new ProductoModel();

  constructor( private productoService: ProductoService,
               private route: ActivatedRoute ) { }

  ngOnInit() {

    const id = this.route.snapshot.paramMap.get('id');

    if ( id !== 'nuevo' ) {

      this.productoService.getMantenimientoProducto( id )
        .subscribe( (resp: ProductoModel) => {
          this.producto = resp;
          this.producto.id = id;
        });

    }

  }

  guardar( form: NgForm ) {

    if ( form.invalid ) {
      console.log('Formulario no válido');
      return;
    }

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información',
      type: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if ( this.producto.id ) {
      peticion = this.productoService.actualizarProducto( this.producto );
    } else {
      peticion = this.productoService.crearProducto( this.producto );
    }

    peticion.subscribe( resp => {

      Swal.fire({
        title: this.producto.descripcion,
        text: 'Se actualizó correctamente',
        type: 'success'
      });

    });



  }

}
