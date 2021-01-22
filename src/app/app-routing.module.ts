import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { AuthGuard } from './_helpers';

import { ProductoComponent } from './pages/producto/producto.component';
import { MantenimientoProductoComponent } from './pages/mantenimientoProducto/mantenimientoProducto.component';

const routes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'producto', component: ProductoComponent },
    { path: 'mantenimientoProducto/:id', component: MantenimientoProductoComponent },
    { path: 'login', component: LoginComponent },

    { path: '**', redirectTo: 'producto' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
