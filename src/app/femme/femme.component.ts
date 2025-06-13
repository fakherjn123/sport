import { Component, ViewChild, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { animate, style, transition, trigger } from '@angular/animations';

interface SportCategory {
  title: string;
  description: string;
  ctaText: string;
  category: string;
  imageUrl: string;
  tagline: string;
}

@Component({
  selector: 'app-femme',
  standalone: true,
  imports: [CommonModule, FooterComponent, NavbarComponent],
  templateUrl: './femme.component.html',
  styleUrls: ['./femme.component.css'],
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('600ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ])
    ])
  ]
})
export class FemmeComponent implements AfterViewInit {
  @ViewChild('heroSection') heroSection!: ElementRef;
  isScrolled = false;
  
  sport: SportCategory[] = [
    {
      title: 'Football',
      description: 'Équipements de football professionnels pour femmes. Des maillots respirants aux chaussures haute performance pour dominer sur le terrain.',
      ctaText: 'Voir produits',
      category: 'football',
      imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTRBewhmjVTjdxjuNOb4hVQZ8WV_CQYiNv1jA&s',
      tagline: 'Performance et précision'
    },
    {
      title: 'Yoga',
      description: 'Tenues confortables et accessoires pour votre pratique du yoga. Des matériaux souples et respirants pour un confort optimal.',
      ctaText: 'Voir produits',
      category: 'yoga',
      imageUrl: 'https://images.pexels.com/photos/4662343/pexels-photo-4662343.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      tagline: 'Flexibilité et zen'
    },
    {
      title: 'Running',
      description: 'Équipements de course à pied techniques et performants. Des chaussures aux vêtements, tout pour optimiser vos performances.',
      ctaText: 'Voir produits',
      category: 'running',
      imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/young-woman-running-training-in-the-city-royalty-free-image-1628789211.jpg?crop=0.88713xw:1xh;center,top&resize=1200:*',
      tagline: 'Dépassez vos limites'
    },
    {
      title: 'Natation',
      description: 'Équipements de natation techniques pour tous les niveaux. Des maillots de bain aux accessoires pour exceller dans l\'eau.',
      ctaText: 'Voir produits',
      category: 'natation',
      imageUrl: 'https://images.pexels.com/photos/1263349/pexels-photo-1263349.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      tagline: 'Fluidité aquatique'
    },
    {
      title: 'Tennis',
      description: 'Des raquettes aux tenues, trouvez tout ce dont vous avez besoin pour performer sur le court de tennis.',
      ctaText: 'Voir produits',
      category: 'tennis',
      imageUrl: 'https://images.pexels.com/photos/8224537/pexels-photo-8224537.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
      tagline: 'Précision et puissance'
    }
  ];

  constructor(private router: Router) {}
  
  @HostListener('window:scroll')
  onWindowScroll() {
    this.isScrolled = window.scrollY > 50;
  }
  
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
          
          // Add staggered animation to child elements
          const children = entry.target.querySelectorAll('.animate-on-visible');
          children.forEach((child, index) => {
            (child as HTMLElement).style.transitionDelay = `${index * 0.1}s`;
            (child as HTMLElement).classList.add('visible');
          });
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -100px 0px' });
    
    const elements = document.querySelectorAll('.sport-card, .section-header, .featured-section');
    elements.forEach(element => {
      observer.observe(element);
    });
  }

  navigateToProducts(category: string): void {
    this.router.navigate(['/produits'], { 
      queryParams: { 
        categorie: category,
        genre: 'femme'
      } 
    });
  }

  handleImageError(event: Event): void {
    const imgElement = event.target as HTMLImageElement;
    imgElement.src = 'assets/images/placeholder-sport.jpg';
    imgElement.alt = 'Image non disponible';
    imgElement.classList.add('error-image');
  }
}