import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-table-modal',
  templateUrl: './table-modal.component.html',
  styleUrls: ['./table-modal.component.less']
})
export class TableModalComponent implements OnInit {
  @Input() results: any;
  @Output() eventEmitter = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  close(): void {
    this.eventEmitter.emit('close');
  }

}
