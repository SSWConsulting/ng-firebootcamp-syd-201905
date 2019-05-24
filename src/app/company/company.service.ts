import { Injectable } from '@angular/core';
import { Company } from './company';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(
    private httpClient: HttpClient
  ) {
    this.loadCompanies();
   }

  API_BASE = 'http://firebootcamp-crm-api.azurewebsites.net/api';

  companies$: BehaviorSubject<Company[]> = new BehaviorSubject<Company[]>([]);

  loadCompanies() {
    this.httpClient.get<Company[]>(`${this.API_BASE}/company`)
    .pipe(
      catchError(error => this.errorHandler<Company[]>(error))
    ).subscribe(companies => this.companies$.next(companies));
  }

  getCompanies(): Observable<Company[]> {
    return this.companies$;
  }

  deleteCompany(id: number): Observable<Company> {
    return this.httpClient.delete<Company>(`${this.API_BASE}/company/${id}`)
    .pipe(
      catchError(error => this.errorHandler<Company>(error))
    );
  }

  addCompany(company: Company): Observable<Company> {
    return this.httpClient.post<Company>(`${this.API_BASE}/company`, company,
    { headers: new HttpHeaders().set('content-type', 'application/json') })
    .pipe(
      catchError(error => this.errorHandler<Company>(error))
    );
  }

  getCompany(companyId: number): Observable<Company> {
    return this.httpClient.get<Company>(`${this.API_BASE}/company/${companyId}`)
    .pipe(
      catchError(error => this.errorHandler<Company>(error))
    );
  }

  updateCompany(company: Company): Observable<Company> {
    return this.httpClient.put<Company>(`${this.API_BASE}/company/${company.id}`,
    company,
    { headers: new HttpHeaders().set('content-type', 'application/json') })
    .pipe(
      catchError(error => this.errorHandler<Company>(error))
    );
  }

  errorHandler<T>(error: Error): Observable<T> {
    console.error('SOMETHING BAD HAPPENED', error);
    return new Observable<T>();
  }


}
