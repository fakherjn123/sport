import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

interface Category {
  title: string;
  description: string;
  ctaText: string;
  category: string;
  image: string;
  link: string;
  gender: string;
  tagline: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
  link: string;
  gender: string;
  rating: number;
  description: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, NavbarComponent, FooterComponent],
  templateUrl: './home1.component.html',
  styleUrls: ['./home1.component.css']
})
export class HomeComponent {
  featuredCategories: Category[] = [
    {
      title: 'Running',
      description: 'Des vêtements respirants et chaussures légères pour vos performances.',
      ctaText: 'Explorer',
      category: 'running',
      image: 'https://images.pexels.com/photos/2827392/pexels-photo-2827392.jpeg',
      link: '/categories/running',
      gender: 'unisex',
      tagline: 'Dépassez vos limites'
    },
    {
      title: 'Fitness',
      description: 'Équipements complets pour vos séances de fitness et musculation.',
      ctaText: 'Découvrir',
      category: 'fitness',
      image: 'https://images.pexels.com/photos/4498294/pexels-photo-4498294.jpeg',
      link: '/categories/fitness',
      gender: 'unisex',
      tagline: 'Sculptez votre corps'
    },
    {
      title: 'Football',
      description: 'Équipements de football professionnels pour performer sur le terrain.',
      ctaText: 'Voir produits',
      category: 'football',
      image: 'https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg',
      link: '/categories/football',
      gender: 'homme',
      tagline: 'Domination sur le terrain'
    },
    {
      title: 'Tennis',
      description: 'Raquettes, vêtements et accessoires pour joueurs de tennis.',
      ctaText: 'Explorer',
      category: 'tennis',
      image: 'https://www.mouratoglou.com/wp-content/uploads/2024/11/ca5f4662-1cb1-444f-91a7-2c544d401c47-DSC08115.jpg',
      link: '/categories/tennis',
      gender: 'unisex',
      tagline: 'Précision et agilité'
    }
  ];

  featuredProducts: Product[] = [
    {
      id: 'run001',
      name: 'Chaussures de running performance',
      price: 129.99,
      image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg',
      category: 'Chaussures',
      link: '/produits/chaussures-running',
      gender: 'unisex',
      rating: 4.5,
      description: 'Chaussures légères avec amorti optimal pour la course'
    },
    {
      id: 'tshirt001',
      name: 'T-shirt technique respirant',
      price: 34.99,
      image: 'https://images.pexels.com/photos/6311391/pexels-photo-6311391.jpeg',
      category: 'Vêtements',
      link: '/produits/tshirt-technique',
      gender: 'homme',
      rating: 4.2,
      description: 'Matière ultra-légère et évacuation de l\'humidité'
    },
    {
      id: 'ball001',
      name: 'Ballon de football professionnel',
      price: 49.99,
      image: 'https://images.pexels.com/photos/47730/the-ball-stadion-football-the-pitch-47730.jpeg',
      category: 'Équipement',
      link: '/produits/ballon-football',
      gender: 'unisex',
      rating: 4.7,
      description: 'Ballon de match officiel avec surface grip améliorée'
    },
    {
      id: 'short001',
      name: 'Short de compression',
      price: 59.99,
      image: 'https://images.pexels.com/photos/4498605/pexels-photo-4498605.jpeg',
      category: 'Vêtements',
      link: '/produits/short-compression',
      gender: 'homme',
      rating: 4.3,
      description: 'Support musculaire optimal pour les sports intensifs'
    }
  ];

  addToWishlist(product: Product): void {
    console.log('Ajout aux favoris:', product.name);
  }

  addToCart(product: Product): void {
    console.log('Ajout au panier:', product.name);
  }
}