import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Combination } from '../models/combination';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SearchCombinationService {
  constructor(private http: HttpClient) {}

  search(value: number, shopId: number): Observable<Combination> {
    return this.http.get<Combination>(
      environment.calculatorServerUrl +
        '/shop/' +
        shopId +
        '/search-combination',
      {
        headers: {
          Authorization: 'tokenTest123',
        },
        params: {
          amount: value,
        },
      }
    );
  }
}
