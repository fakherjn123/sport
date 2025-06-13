import { Routes } from '@angular/router';



import { HomeComponent } from './home1/home1.component';
import { FemmeComponent } from '../app/femme/femme.component';
import{HommeComponent} from'../app/homme/homme.component'; 
import {ProduitsComponent}from '../app/produits/produits.component';
export const routes: Routes = [
    {path:'',component:HomeComponent},
  
   
    {path:'home1',component:HomeComponent},
    { path: 'femme', component: FemmeComponent },
    {path : 'homme',component:HommeComponent},
    {path:'produits',component:ProduitsComponent},
  
];
