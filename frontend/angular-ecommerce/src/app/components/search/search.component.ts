import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  doSearch(value: String){
    // console.log(`value = ${value}`);
    // we have already handled the condition when this url is fired.
    this.router.navigateByUrl(`/search/${value}`); // logics already written by product list component so no need to re-invent the wheel.
  }

}
