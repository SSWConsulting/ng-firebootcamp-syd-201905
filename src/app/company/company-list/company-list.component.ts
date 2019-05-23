import { Component, OnInit } from '@angular/core';
import { Company } from '../company';

@Component({
  selector: 'fbc-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  companies: Company[] = [
    { name: 'Company A', phone: 123345, email: 'CompanyA@ssw.com.au' },
    { name: 'Company B', phone: 123345, email: 'CompanyB@ssw.com.au' },
    { name: 'Company C', phone: 123345, email: 'CompanyC@ssw.com.au' },
  ];

  constructor() { }

  ngOnInit() {
  }

}
