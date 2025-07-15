import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Favorite } from '../interface/iFavorite.interface';
const favorite = environment.HOST_API + "/favorite"
@Injectable({
    providedIn: 'root'
})
export class FavoriteService {
    private http = inject(HttpClient)
    constructor() { }

    Create(payload: Favorite): Observable<Favorite> {
        return this.http.post<Favorite>(favorite, payload);
    }

}