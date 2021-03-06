import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Country } from '../common/country';
import { State } from '../common/state';

@Injectable({
  providedIn: 'root'
})
export class Luv2ShopFormService {

  private countriesUrl = 'http://localhost:8080/api/countries';
  private statesUrl = 'http://localhost:8080/api/states';
  

  /**
   * we are using Subject to emit data for CartService because subject is multicast (value is constant for its subscriber)
   * observable is used here because observable is unicast and value may differ
   */
  constructor(private httpClient: HttpClient) { }

  getCountries(): Observable<Country[]>{
    return this.httpClient.get<GetResponseCountries>(this.countriesUrl).pipe(
      map(response => response._embedded.countries)
    );
  }

  getStates(theCountryCode: string): Observable<State[]>{
    const searchStatesUrl = `${this.statesUrl}/search/findByCountryCode?code=${theCountryCode}`;
    return this.httpClient.get<GetResponseStates>(searchStatesUrl).pipe(
      map(response => response._embedded.states)
    );
  }



  getCreditCardMonths(startMonth: number): Observable<number[]>{  
    let data: number[] = [];
    // build an array for month dropdown list
    // start at current month and loop until
    for(let theMonth= startMonth; theMonth <=12; theMonth++){
      data.push(theMonth);
    }
    console.log(`data: `+data);    return of(data); // of wraps data as observable.
  }

  getCreditCardYears(): Observable<number[]>{
    let data: number[] = [];

    // build an array for year downlist list
    // start at current year and loop for next 10 years

    const startYear: number = new Date().getFullYear();
    const endYear: number = startYear + 10;

    for(let theYear = startYear; theYear <= endYear; theYear++){
      data.push(theYear);
    }

    return of(data); // of wraps data as observable
  }



}

interface GetResponseCountries{
  _embedded: {
    countries: Country[]; // unwraps the JSON from spring data rest _embedded entry
  }
}

interface GetResponseStates{
  _embedded: {
    states: State[];
  }
}
