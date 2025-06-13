import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';

interface SportCategory {
  title: string;
  description: string;
  ctaText: string;
  category: string;
  imageUrl: string;
  tagline: string;
}

@Component({
  selector: 'app-homme',
  standalone: true,
  imports: [CommonModule, FooterComponent, NavbarComponent],
  templateUrl: './homme.component.html',
  styleUrls: ['./homme.component.css']
})
export class HommeComponent implements AfterViewInit {
  @ViewChild('heroSection') heroSection!: ElementRef;
  
  sport: SportCategory[] = [
    {
      title: 'Football',
      description: 'Équipements de football professionnels pour hommes. Des maillots respirants aux chaussures haute performance pour dominer sur le terrain.',
      ctaText: 'Voir produits',
      category: 'football',
      imageUrl: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tagline: 'Excellence sur le terrain'
    },
    {
      title: 'Running',
      description: 'Équipements de course à pied techniques et performants. Des chaussures aux vêtements, tout pour optimiser vos performances.',
      ctaText: 'Voir produits',
      category: 'running',
      imageUrl: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tagline: 'Repoussez vos limites'
    },
    {
      title: 'Musculation',
      description: 'Équipements spécialisés pour la musculation et le crossfit. Des vêtements confortables aux accessoires essentiels.',
      ctaText: 'Voir produits',
      category: 'musculation',
      imageUrl: 'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tagline: 'Puissance et performance'
    },
    {
      title: 'Natation',
  description: 'Équipements de natation techniques pour tous les niveaux. Des maillots de bain aux accessoires pour exceller dans l\'eau.',
  ctaText: 'Voir produits',
  category: 'natation',
  imageUrl: 'https://img.passeportsante.net/1200x675/2021-05-06/i106189-natation-activite-physique-multiples-bienfaits.jpg',
  tagline: 'Maîtrisez les eaux'
    },
    {
      title: 'Basketball',
      description: 'Du terrain de street aux parquets professionnels, trouvez l\'équipement parfait pour votre jeu de basketball.',
      ctaText: 'Voir produits',
      category: 'basketball',
      imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tagline: 'Dominez le terrain'
    }
  ];

  constructor(private router: Router) {}
  
  ngAfterViewInit(): void {
    this.animateHeroSection();
    this.initScrollAnimation();
  }
  
  private animateHeroSection(): void {
    if (this.heroSection) {
      setTimeout(() => {
        this.heroSection.nativeElement.classList.add('animate');
      }, 100);
    }
  }
  
  private initScrollAnimation(): void {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });
    
    const cards = document.querySelectorAll('.sport-card');
    cards.forEach(card => {
      observer.observe(card);
    });
  }

  navigateToProducts(category: string): void {
    this.router.navigate(['/produits'], { 
      queryParams: { 
        categorie: category,
        genre: 'homme'
      } 
    });
  }

  // Méthode pour gérer les erreurs d'image
  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/placeholder-sport.jpg';
    imgElement.alt = 'Image non disponible';
    imgElement.classList.add('error-image');
  }
}