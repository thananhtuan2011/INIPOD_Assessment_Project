import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Banner } from '../interface/iBanner.interface';
import { Pokemon } from '../interface/iPokemon.interface';
import { PaginatedResponse } from '../interface/iPaginated.interface';
const pokemon = environment.HOST_API + "/pokemon"
@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private http = inject(HttpClient)
  constructor() { }

  randomBanner(): Observable<Banner> {
    return this.http.get<Banner>(pokemon + '/randomBanner');
  }
  GetPokemon(): Observable<Pokemon> {
    return this.http.get<Pokemon>(pokemon + '/GetPokemon');
  }


  getPokemonList(params: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
  }): Observable<PaginatedResponse<Pokemon>> {
    let httpParams = new HttpParams();
    if (params.page) httpParams = httpParams.set('page', params.page);
    if (params.limit) httpParams = httpParams.set('limit', params.limit);
    if (params.search) httpParams = httpParams.set('search', params.search);
    if (params.sortBy) httpParams = httpParams.set('sortBy', params.sortBy);
    if (params.sortOrder) httpParams = httpParams.set('sortOrder', params.sortOrder);

    return this.http.get<PaginatedResponse<Pokemon>>(pokemon + '/GetPaginatedPokemon', { params: httpParams });
  }
  GetMyFavorite(params: {
    page?: number;
    limit?: number;
    search?: string;
    sortBy?: string;
    sortOrder?: 'ASC' | 'DESC';
  }): Observable<PaginatedResponse<Pokemon>> {
    let httpParams = new HttpParams();
    if (params.page) httpParams = httpParams.set('page', params.page);
    if (params.limit) httpParams = httpParams.set('limit', params.limit);
    if (params.search) httpParams = httpParams.set('search', params.search);
    if (params.sortBy) httpParams = httpParams.set('sortBy', params.sortBy);
    if (params.sortOrder) httpParams = httpParams.set('sortOrder', params.sortOrder);

    return this.http.get<PaginatedResponse<Pokemon>>(pokemon + '/GetMyFavorite', { params: httpParams });
  }

}
