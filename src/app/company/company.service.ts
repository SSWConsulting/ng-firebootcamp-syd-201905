import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, retry, delay } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from '../state/AppState';
import * as companyActions from '../state/company/company.actions';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private httpClient: HttpClient,
    private store: Store<AppState>
  ) {
    this.loadCompanies();
   }

  API_BASE = 'http://firebootcamp-crm-api.azurewebsites.net/api';

  loadCompanies() {
    this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
    .pipe(
      catchError(error => this.errorHandler<Company[]>(error))
    ).subscribe(companies => this.store.dispatch(new companyActions.LoadCompaniesSuccess(companies)));
  }

  getCompanies(): Observable<Company[]> {
    return this.store.select(s => s.companies);
  }

  deleteCompany(id: number) {
    return this.httpClient.delete<Company>(`${this.API_BASE}/company/${id}`)
    .pipe(
      catchError(error => this.errorHandler<Company>(error))
    )
    .subscribe( c => this.loadCompanies() );
  }

  addCompany(company: Company) {
    return this.httpClient.post<Company>(`${this.API_BASE}/company`, company,
    { headers: new HttpHeaders().set('content-type', 'application/json') })
    .pipe(
      catchError(error => this.errorHandler<Company>(error))
    )
    .subscribe(c => this.loadCompanies() );
  }

  getCompany(companyId: number): Observable<Company> {
    return this.httpClient.get<Company>(`${this.API_BASE}/company/${companyId}`)
    .pipe(
      catchError(error => this.errorHandler<Company>(error))
    );
  }

  updateCompany(company: Company) {
    return this.httpClient.put<Company>(`${this.API_BASE}/company/${company.id}`,
    company,
    { headers: new HttpHeaders().set('content-type', 'application/json') })
    .pipe(
      catchError(error => this.errorHandler<Company>(error)),
      // delay(1000)
    )
    .subscribe( c => this.loadCompanies() );
  }

  errorHandler<T>(error: Error): Observable<T> {
    console.error('SOMETHING BAD HAPPENED', error);
    return new Observable<T>();
  }


}
