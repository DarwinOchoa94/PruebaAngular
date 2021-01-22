import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductoModel } from '../models/producto.model';
import { HeaderModel } from '@app/models/header.model';
import { map, delay } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private url = 'https://rolimapp.com:3000';


  constructor( private http: HttpClient ) { }


  crearProducto( producto: ProductoModel ) {

    return this.http.post(`${ this.url }/productos`, producto)
            .pipe(
              map( (resp: any) => {

                producto.id = resp.name;
                return producto;
              })
            );

  }

  actualizarProducto( producto: ProductoModel ) {

    const productoTemp = {
      ...producto
    };

    delete productoTemp.id;

    return this.http.put(`${ this.url }/productos/${ producto.id }`, productoTemp);


  }

  borrarProducto( id: string ) {

    return this.http.delete(`${ this.url }/productos/${ id }`);

  }

  getMantenimientoProducto( id: string ) {

    return this.http.get(`${ this.url }/productos/${ id }`);

  }

  getProducto( header: HeaderModel) {
    
    return this.http.post(`${ this.url }/productos`, header)
            .pipe(
              map( this.crearArreglo ),
              delay(0)
            );
  }

  private crearArreglo( productosObj: object ) {

    const productos: ProductoModel[] = [];

    Object.keys( productosObj ).forEach( key => {

      const producto: ProductoModel = productosObj[key];

      productos.push( producto );
    });


    return productos;
    
    

  }


}
