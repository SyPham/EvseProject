
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/_core/_guards/auth.guard';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  
   {
    path: 'evse/home',
    component: HomeComponent,
    data: {
      title: 'Home',
      breadcrumb: 'Home',
      functionCode: 'Home'
    },
   // canActivate: [AuthGuard]
  },
  
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EvseRoutingModule { }
