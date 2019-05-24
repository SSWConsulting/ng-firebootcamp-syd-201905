import { Component, OnInit } from '@angular/core';
import { CompanyService } from '../company.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'fbc-company-edit',
  templateUrl: './company-edit.component.html',
  styleUrls: ['./company-edit.component.scss']
})
export class CompanyEditComponent implements OnInit {

  isNewCompany: boolean;
  companyId: number;
  companyForm: FormGroup;

  constructor(
    private companyService: CompanyService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.isNewCompany = !(this.activatedRoute.snapshot.params['id']);
    this.buildForm();

    if (this.isNewCompany) {
    } else {
    }
  }

  buildForm() {
    this.companyForm = this.formBuilder.group(
      {
        name: ['', Validators.required],
        phone: [''],
        email: ['@ssw.com.au']
      }
    );
  }

  saveCompany() {
    if (this.isNewCompany) {
      // Add a new Company
      this.companyService.addCompany(this.companyForm.value)
      .subscribe(company => {
        this.router.navigateByUrl('/company/list');
      });

    } else {
      // Update given Company
    }
  }

}
