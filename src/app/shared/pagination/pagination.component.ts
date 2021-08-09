import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.less'],
})
export class PaginationComponent implements OnInit {
  @Input() currentPageNumber: number = 1;
  @Input() totalPageNumber: number = 1;
  @Input() titlePrevious: string;
  @Input() titlePreviousPosition: string;
  @Input() titleNext: string;
  @Input() titleNextPosition: string;
  @Input() isAbleToPrevious: boolean = false;
  @Input() isAbleToNext: boolean = false;
  @Output('on-click-previous') onClickPreviousEmitter: EventEmitter<number>;
  @Output('on-click-next') onClickNextEmitter: EventEmitter<number>;
  @Output('on-enter') onEnterEmitter: EventEmitter<number>;

  @ViewChild('inputCurrentPageNumber') inputCurrentPageNumber: ElementRef;

  constructor() {
    this.onClickPreviousEmitter = new EventEmitter<number>();
    this.onClickNextEmitter = new EventEmitter<number>();
    this.onEnterEmitter = new EventEmitter<number>();
  }

  ngOnInit(): void {
    this.initializePagination();
  }

  ngAf

  public initializePagination(): void {
    if (
      this.currentPageNumber > 1 &&
      this.currentPageNumber < this.totalPageNumber
    ) {
      this.isAbleToPrevious = false;
      this.isAbleToNext = false;
    } else if (
      this.currentPageNumber == 1 &&
      this.currentPageNumber < this.totalPageNumber
    ) {
      this.isAbleToPrevious = true;
      this.isAbleToNext = false;
    } else if (
      this.currentPageNumber > 1 &&
      this.currentPageNumber == this.totalPageNumber
    ) {
      this.isAbleToPrevious = false;
      this.isAbleToNext = true;
    } else {
      this.isAbleToPrevious = true;
      this.isAbleToNext = true;
    }
  }

  ngAfterViewInit() {
    this.inputCurrentPageNumber.nativeElement.value = this.currentPageNumber;
  }

  public onClickPrevious(event: Event): void {
    if (
      this.currentPageNumber > 1 &&
      this.currentPageNumber <= this.totalPageNumber
    ) {
      this.isAbleToPrevious = false;
      this.isAbleToNext = false;
      this.currentPageNumber = this.currentPageNumber - 1;
      this.inputCurrentPageNumber.nativeElement.value = this.currentPageNumber;
      this.onClickPreviousEmitter.emit(this.currentPageNumber);
    } else if (
      this.currentPageNumber == 1 &&
      this.currentPageNumber < this.totalPageNumber
    ) {
      this.isAbleToPrevious = true;
      this.isAbleToNext = false;
    } else {
      this.isAbleToPrevious = true;
      this.isAbleToNext = true;
    }
  }

  public onClickNext(event: Event): void {
    if (
      this.currentPageNumber >= 1 &&
      this.currentPageNumber < this.totalPageNumber
    ) {
      this.isAbleToPrevious = false;
      this.isAbleToNext = false;
      this.currentPageNumber = this.currentPageNumber + 1;
      this.inputCurrentPageNumber.nativeElement.value = this.currentPageNumber;
      this.onClickNextEmitter.emit(this.currentPageNumber);
    } else if (
      this.currentPageNumber > 1 &&
      this.currentPageNumber == this.totalPageNumber
    ) {
      this.isAbleToPrevious = false;
      this.isAbleToNext = true;
    } else {
      this.isAbleToPrevious = true;
      this.isAbleToNext = true;
    }
  }

  public onKeyDownEnter(event: KeyboardEvent): void {
    let value: string = (event.target as HTMLInputElement).value;
    let currentPageNumber: number = parseInt(value);
    if (
      currentPageNumber >= 1 &&
      currentPageNumber <= this.totalPageNumber &&
      currentPageNumber != this.currentPageNumber
    ) {
      this.isAbleToPrevious = currentPageNumber == 1 ? true : false;
      this.isAbleToNext =
        currentPageNumber == this.totalPageNumber ? true : false;
      this.onEnterEmitter.emit(currentPageNumber);
    } else {
      this.inputCurrentPageNumber.nativeElement.value = this.currentPageNumber;
    }
  }
}
