import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAlgoData } from '../model/IAlgoData';
import { IProblem } from '../model/IProblem';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AlgoService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) { }
  api: string = 'https://fwa-server-2.herokuapp.com/';

  addAlgo(algo: IProblem): Observable<object> {

    let requestHeader = this.getHeaders();
    return this.http.post(this.api + 'api/v1/algorithms/add', algo, { headers: requestHeader });

  }

  editAlgo(algo: IProblem, id: string): Observable<object> {
    
    let requestHeader = this.getHeaders();
    return this.http.put(this.api + 'api/v1/algorithms/'+ id, algo, { headers: requestHeader });

  }

  deleteAlgo(id: string): Observable<object> {

    let requestHeader = this.getHeaders();
    return this.http.delete(this.api + 'api/v1/algorithms/'+ id, { headers: requestHeader });
    
  }

  getAlgorithms(tags: string, page: number, size: number): Observable<object> {
    
    let requestHeader = this.getHeaders();  
    if(page !== undefined && size !== undefined)
      return this.http.get(this.api + 'api/v1/algorithms/all?tags='+tags+'&page='+page+'&size='+size);
    else
      return this.http.get(this.api + 'api/v1/algorithms/all');

  }

  getAlgorithmsAddedByMe(tags: string, page: number, size: number): Observable<object> {
    
    let requestHeader = this.getHeaders();  
    if(page !== undefined && size !== undefined)
      return this.http.get(this.api + 'api/v1/algorithms/admin/all?tags='+tags+'&page='+page+'&size='+size, { headers: requestHeader });
    else
      return this.http.get(this.api + 'api/v1/algorithms/all');

  }

  getAlgorithmById(id: string): Observable<IAlgoData> {
    return this.http.get<IAlgoData>(this.api + 'api/v1/algorithms/'+id);
  }

  getCategoryList(): Observable<object> {
    return this.http.get(this.api + 'api/v1/algorithms/categories/list');
  }

  getCategoryListForDashboard(): Observable<object[]> {
    return this.http.get<object[]>(this.api + 'api/v1/algorithms/categories')
  }

  getHeaders() : HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'x-access-token': this.cookieService.get('fwa-token')
    });
  }

}
