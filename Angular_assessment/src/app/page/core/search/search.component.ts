import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent {
  @Input() public height?: string;
  @Input() public value?: string;
  @Output() onChange = new EventEmitter<any>();

  constructor() { }

  handleOnChange(event: any) {
    this.onChange.emit(event?.target?.value ?? '')
  }
}
