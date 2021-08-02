import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketReportComponent } from './market-report.component';

describe('MarketReportComponent', () => {
  let component: MarketReportComponent;
  let fixture: ComponentFixture<MarketReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketReportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
