import { typeWithParameters } from '@angular/compiler/src/render3/util';
import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { CrudService } from 'src/app/service/crud.service';

@Component({
  selector: 'app-market-report',
  templateUrl: './market-report.component.html',
  styleUrls: ['./market-report.component.less'],
})
export class MarketReportComponent implements OnInit {
  @ViewChild('audioOption') audioPlayerRef: ElementRef;
  public filterFormGroup: FormGroup;
  public results: any;
  public isNotified: any;
  public showAutoSearchField: boolean;
  public minPower: number = 350;

  constructor(private crudService: CrudService) {}

  ngOnInit(): void {
    this.initializeFormGroup();
    this.getMarketReportEveryMinute();
    setInterval(() => {
      this.getMarketReportEveryMinute();
    }, 30000);
  }

  initializeFormGroup(): void {
    this.filterFormGroup = new FormGroup({
      element: new FormControl(''),
      minStars: new FormControl(''),
      maxStars: new FormControl(''),
      minPower: new FormControl(''),
    });
  }

  @HostListener('window:mousemove') refreshUserState() {
    clearInterval(this.isNotified);
  }

  getMarketReport(): void {
    this.crudService
      .get(
        `https://api.cryptoblades.io/static/market/weapon?element=${this.filterFormGroup.value.element}&minStars=${this.filterFormGroup.value.minStars}&maxStars=${this.filterFormGroup.value.maxStars}&sortBy=price&sortDir=1&pageSize=60&pageNum=0`
      )
      .subscribe((res: any) => {
        let filteredData = [];
        if (res.results?.length) {
          filteredData = res.results.filter((val) =>
            this.getFilteredList(
              val,
              this.filterFormGroup.value.minStars,
              this.filterFormGroup.value.minPower
            )
          );
        }
        this.results = filteredData;
      });
  }

  getMarketReportEveryMinute(): void {
    this.crudService
      .get(
        `https://api.cryptoblades.io/static/market/weapon?element=&minStars=5&maxStars=&sortBy=price&sortDir=1&pageSize=60&pageNum=0`
      )
      .subscribe((res: any) => {
        if (res.results?.length) {
          let filteredData = [];
          filteredData = res.results.filter((val) =>
            this.getFilteredList(val, 5, this.minPower)
          );
          if (filteredData.length) {
            this.results = res.results;
            this.playSound();
            this.isNotified = setInterval(() => {
              this.playSound();
            }, 3000);
          }
        }
      });
  }

  getFilteredList(weaponVal: any, stars: number, minPower: number) {
    if (stars === 5) {
      if (
        weaponVal.stat1Value >= minPower &&
        weaponVal.stat2Value >= minPower &&
        weaponVal.stat3Value >= minPower
      ) {
        return true;
      } else return false;
    } else if (stars < 5 && stars >= 3) {
      if (
        weaponVal.stat1Value >= minPower &&
        weaponVal.stat2Value >= minPower
      ) {
        return true;
      } else return false;
    } else if (stars < 3 && stars >= 1) {
      if (weaponVal.stat1Value >= minPower) {
        return true;
      } else return false;
    } else {
      return true;
    }
  }

  playSound(): void {
    this.audioPlayerRef.nativeElement.muted = false;
    this.audioPlayerRef.nativeElement.play();
  }

  submit(): void {
    this.getMarketReport();
  }
}
