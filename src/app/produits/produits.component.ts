import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FooterComponent } from '../footer/footer.component';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { ProductService } from '../services/product.service';
import { Product, ProductFilter } from '../models/product.model';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-produits',
  standalone: true,
  imports: [CommonModule, RouterModule, FooterComponent, NavbarComponent],
  templateUrl: './produits.component.html',
  styleUrls: ['./produits.component.css']
})
export class ProduitsComponent implements OnInit {
  category: string = '';
  genre: string = '';
  products: Product[] = [];
  filteredProducts: Product[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    // Subscribe to query parameters to fetch category and genre
    this.route.queryParamMap.subscribe(params => {
      this.category = params.get('categorie') || ''; // Fetch category
      this.genre = params.get('genre') || '';       // Fetch genre
      this.loadProducts(); // Load the products with the applied filters
    });
  }

  // Load the products with applied filters
  loadProducts(): void {
    this.loading = true;
    
    // Create a filter object based on the category and genre
    const filter: ProductFilter = {};
    if (this.category && this.category !== 'tous') {
      filter.category = this.category;  // Filter by category
    }
    if (this.genre) {
      filter.genre = this.genre;        // Filter by genre
    }

    // Call the ProductService to fetch products
    this.productService.getProducts(filter).subscribe({
      next: (response) => {
        // Update the products array with the fetched data
        this.products = response.products;
        // Optionally apply additional filtering if needed
        this.filteredProducts = this.products;
        this.loading = false; // Stop loading spinner
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.error = 'Failed to load products. Please try again later.';
        this.loading = false; // Stop loading spinner
      }
    });
  }

  // Optional: Additional method to filter products based on user actions (e.g., pagination or sorting)
  filterProducts(): void {
    // You can apply more complex filtering logic here if required
    this.filteredProducts = this.products.filter(product => {
      // Example filter: if product category matches
      return product.category === this.category || this.category === 'tous';
    });
  }

  // Méthode pour ajouter un produit au panier
  addToCart(product: Product): void {
    this.cartService.addToCart(product);
    // Notification à l'utilisateur
    alert(`${product.name} a été ajouté au panier`);
  }
}