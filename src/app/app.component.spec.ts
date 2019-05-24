import { AppComponent } from "./app.component";
import { of } from 'rxjs';
import { componentNeedsResolution } from '@angular/core/src/metadata/resource_loading';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CompanyService } from './company/company.service';
import { DebugElement } from '@angular/core';
import { CompanyListComponent } from './company/company-list/company-list.component';
import { CompanyTableComponent } from './company/company-table/company-table.component';
import { CompanyEditComponent } from './company/company-edit/company-edit.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { APP_BASE_HREF } from '@angular/common';

describe('checking tetsing', () => {
  it('should add 1+1', () => {
    expect(1 + 1).toBe(2);
  });

  it('can create an appComponent', () => {
    let c = new AppComponent(null);
    expect(c.title).toBe('firebootcamp-crm');
  });
});


describe('Mock Service', () => {

  let svc;

  beforeEach(() => {
    svc = {
      getCompanies: () => of([{
        name: 'FakeCorp',
        email: 'fake@corp.com',
        phone: 12345
      }])
    };
  });

  it('company count contains 1', () => {
    let component = new AppComponent(svc);
    component.ngOnInit();
    component.companiesCount$.subscribe(cc => expect(cc).toBe(1));
  });

  it('companyCoiunt contains 2', () => {
    spyOn(svc, 'getCompanies').and.returnValue(
      of([
        { name: 'aaa', phone: 123, email: 'sss@ss.com' },
        { name: 'bbb', phone: 123, email: 'sss@ss.com' }
      ])
    );
    let component = new AppComponent(svc);
    component.ngOnInit();
    component.companiesCount$.subscribe(cc => expect(cc).toBe(2));
  });

});


describe('testBed', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;
  let companySvc: CompanyService;
  let de: DebugElement;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,
        CompanyListComponent,   // Our routing module needs it
        CompanyTableComponent,  // Our routing module needs it
        CompanyEditComponent,   // Our routing module needs it
      ],
      imports: [
        AppRoutingModule, // Routerlink in AppComponent needs it
        HttpClientModule,
        ReactiveFormsModule
      ],
      providers: [{provide: APP_BASE_HREF, useValue: '/'}]
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    companySvc = TestBed.get(CompanyService);
  });

  it('companyCount is 2', () => {

    spyOn(companySvc, 'getCompanies').and.returnValue(
      of([
        { name: 'aaa', phone: 123, email: 'sss@ss.com' },
        { name: 'bbb', phone: 123, email: 'sss@ss.com' }
      ])
    );
    fixture.detectChanges();

    expect(component.companiesCount$.subscribe(cc => {
      expect(cc).toEqual(2);
    }));

  });
});



