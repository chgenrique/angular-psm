import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/internal/Observable";
import {environment} from "../../environments/environment";
import {Subject} from "rxjs/internal/Subject";
import {map} from "rxjs/operators";

@Injectable()
export class RoboPassService {
  onSearchTextChanged: Subject<any> = new Subject();
  searchText: string;
  CONFIG = environment;

  constructor(
      private _httpClient: HttpClient
  ) {
      this.onSearchTextChanged.subscribe(searchText => {
          this.searchText = searchText;
          this.onSearchTextChanged.subscribe(pSearchText => {
              this.searchText = pSearchText;
              this.getCategories().subscribe();
          });
      });
  }

  getCategories(search = '',
                pageNumber = 0,
                pageSize = 20
  ): Observable<any> {
      const url = this.CONFIG.api.serverUrl + '/categories';
      return this._httpClient.get(url, {
        params: new HttpParams()
            .set('search', search)
            .set('pageNumber', pageNumber.toString())
            .set('pageSize', pageSize.toString())
      }).pipe(
          map( res => res)
      );
  }
}