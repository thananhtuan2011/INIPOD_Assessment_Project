import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Banner } from '../interface/iBanner.interface';
const UrlApi = environment.HOST_API + "/pokemon"
@Injectable({
  providedIn: 'root'
})
export class HomeService {
  private http = inject(HttpClient)
  constructor() { }

  randomBanner(): Observable<Banner> {
    return this.http.get<Banner>(UrlApi + '/randomBanner');
  }

}
