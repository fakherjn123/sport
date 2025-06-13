import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService, CartItem } from '../services/cart.service';
import { NavbarComponent } from '../shared/navbar/navbar.component';
import { FooterComponent } from '../footer/footer.component';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, NavbarComponent, FooterComponent,cartco],
   templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: CartItem[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(items => {
      this.cartItems = items;
      this.calculateTotal();
    });
  }

  updateQuantity(item: CartItem, newQuantity: number): void {
    this.cartService.updateQuantity(item.product.id, newQuantity);
  }

  removeItem(productId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet article du panier?')) {
      this.cartService.removeFromCart(productId);
    }
  }

  clearCart(): void {
    if (confirm('Êtes-vous sûr de vouloir vider votre panier?')) {
      this.cartService.clearCart();
    }
  }

  checkout(): void {
    alert('Fonctionnalité de paiement à implémenter');
    // Redirection vers la page de paiement
  }

  private calculateTotal(): void {
    this.total = this.cartService.getTotal();
  }
}