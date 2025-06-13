import { Component } from '@angular/core';
import { NavbarComponent } from './../../shared/navbar/navbar.component';
import { CommonModule } from '@angular/common'; // <-- tu as bien importé, mais pas encore utilisé
import {FooterComponent} from'.././../footer/footer.component'
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, NavbarComponent,FooterComponent], // <-- AJOUTER CommonModule ici
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  photos = [
    {
      imageUrl: 'assets/123.jpg',
      description: 'Description de la photo 1'
    },
    {
      imageUrl: 'assets/222.jpg',
      description: 'Description de la photo 2'
    },
    {
      imageUrl: 'assets/333.jpg',
      description: 'Description de la photo 3'
    },
    {
      imageUrl: 'assets/444.jpg',
      description: 'Raquettes et balles de Tennis'
    },
    {
      imageUrl: 'assets/555.jpg',
      description: 'Équipements de Basketball'
    },
    {
      imageUrl: 'assets/666.jpg',
      description: 'Accessoires de Natation'
    },
    {
      imageUrl: 'assets/777.jpg',
      description: 'Vélos et équipements de Cyclisme'
    },
    {
      imageUrl: 'assets/888.jpg',
      description: 'Matériel de Randonnée'
    }
  
  ];
}
