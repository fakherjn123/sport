import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Product } from '../models/product.model';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartSubject = new BehaviorSubject<CartItem[]>([]);
  
  constructor() {
    // Charger le panier depuis le localStorage au démarrage
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems = JSON.parse(savedCart);
      this.cartSubject.next(this.cartItems);
    }
  }
  
  getCart(): Observable<CartItem[]> {
    return this.cartSubject.asObservable();
  }
  
  getCartItemsCount(): Observable<number> {
    return new Observable<number>(observer => {
      this.getCart().subscribe(items => {
        const count = items.reduce((total, item) => total + item.quantity, 0);
        observer.next(count);
      });
    });
  }
  
  addToCart(product: Product, quantity: number = 1): void {
    // Vérifier si le produit est déjà dans le panier
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    
    if (existingItem) {
      // Mettre à jour la quantité si le produit existe déjà
      existingItem.quantity += quantity;
    } else {
      // Ajouter un nouvel élément si le produit n'existe pas
      this.cartItems.push({ product, quantity });
    }
    
    // Mettre à jour le BehaviorSubject et le localStorage
    this.updateCart();
  }
  
  updateQuantity(productId: number, quantity: number): void {
    const item = this.cartItems.find(item => item.product.id === productId);
    
    if (item) {
      if (quantity <= 0) {
        // Supprimer l'élément si la quantité est 0 ou négative
        this.removeFromCart(productId);
      } else {
        // Mettre à jour la quantité
        item.quantity = quantity;
        this.updateCart();
      }
    }
  }
  
  removeFromCart(productId: number): void {
    this.cartItems = this.cartItems.filter(item => item.product.id !== productId);
    this.updateCart();
  }
  
  clearCart(): void {
    this.cartItems = [];
    this.updateCart();
  }
  
  getTotal(): number {
    return this.cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity);
    }, 0);
  }
  
  private updateCart(): void {
    // Mettre à jour le BehaviorSubject
    this.cartSubject.next([...this.cartItems]);
    
    // Sauvegarder dans le localStorage
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }
}