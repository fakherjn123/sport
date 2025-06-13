import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Product, ProductResponse, ProductFilter } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'http://localhost:8000/api'; // Changez le port à 8000 si nécessaire

  constructor(private http: HttpClient) { }

  getProducts(filter?: ProductFilter): Observable<ProductResponse> {
    let url = `${this.apiUrl}/products`;

    if (filter) {
      const params = new URLSearchParams();

      if (filter.category) params.append('category', filter.category);
      if (filter.genre) params.append('genre', filter.genre);
      if (filter.minPrice) params.append('minPrice', filter.minPrice.toString());
      if (filter.maxPrice) params.append('maxPrice', filter.maxPrice.toString());
      if (filter.inStock !== undefined) params.append('inStock', filter.inStock.toString());
      if (filter.page) params.append('page', filter.page.toString());
      if (filter.limit) params.append('limit', filter.limit.toString());
      if (filter.sortBy) params.append('sortBy', filter.sortBy);
      if (filter.sortDirection) params.append('sortDirection', filter.sortDirection);

      url += `?${params.toString()}`;
    }

    return this.http.get<ProductResponse>(url).pipe(
      catchError(this.handleError)
    );
  }

  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/products/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Error: ${error.error.message}`;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
