import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { filter } from 'rxjs/operators';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-market-report',
  templateUrl: './market-report.component.html',
  styleUrls: ['./market-report.component.less'],
})
export class MarketReportComponent implements OnInit {
  public filterFormGroup: FormGroup;
  public results: any;

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.initializeFormGroup();
    this.getMarketReport();
  }

  initializeFormGroup(): void {
    this.filterFormGroup = new FormGroup({
      element: new FormControl(''),
      minStars: new FormControl(''),
      maxStars: new FormControl(''),
      minPower: new FormControl(0),
    });
  }

  getMarketReport(): void {
    this.crudService
      .get(
        `https://api.cryptoblades.io/static/market/weapon?element=${this.filterFormGroup.value.element}&minStars=${this.filterFormGroup.value.minStars}&maxStars=${this.filterFormGroup.value.maxStars}&sortBy=price&sortDir=1&pageSize=60&pageNum=0`
      )
      .subscribe((res: any) => {
        let filteredData = [];
        if(res.results?.length){
          filteredData = res.results.filter(val => this.filterByMinPower(val))
        }
        this.results = filteredData;
      });
  }

  filterByMinPower(weaponVal) {
    if ((this.filterFormGroup.value.minStars = 5)) {
      if (
        weaponVal.stat1Value >= this.filterFormGroup.value.minPower &&
        weaponVal.stat2Value >= this.filterFormGroup.value.minPower &&
        weaponVal.stat3Value >= this.filterFormGroup.value.minPower
      ) {
        return true;
      }
      else return false;
    } else if (
      this.filterFormGroup.value.minStars < 5 &&
      this.filterFormGroup.value.minStars >= 3
    ) {
      if (
        weaponVal.stat1Value >= this.filterFormGroup.value.minPower &&
        weaponVal.stat2Value >= this.filterFormGroup.value.minPower
      ) {
        return true;
      }
      else return false;
    } else if (
      this.filterFormGroup.value.minStars < 3 &&
      this.filterFormGroup.value.minStars >= 1
    ) {
      if (weaponVal.stat1Value >= this.filterFormGroup.value.minPower) {
        return true;
      }
      else return false;
    } else {
      return true;
    }
  }

  submit(): void {
    this.getMarketReport();
  }
}
