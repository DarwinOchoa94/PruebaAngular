import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

// Helper usado para conectarse a un helper fake backend, comentar para usar un microservicio
import { fakeBackendProvider } from './_helpers';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { HomeComponent } from './home';
import { LoginComponent } from './login';

import { MantenimientoProductoComponent } from './pages/mantenimientoProducto/mantenimientoProducto.component';
import { ProductoComponent } from './pages/producto/producto.component';
import { CartComponent } from './pages/cart/cart.component'

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        AppRoutingModule,
    ],
    declarations: [
        AppComponent,
        HomeComponent,
        LoginComponent,
        MantenimientoProductoComponent,
        ProductoComponent,
        CartComponent
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

        // Helper usado para conectarse a un helper fake backend, comentar para usar un microservicio
        fakeBackendProvider
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }