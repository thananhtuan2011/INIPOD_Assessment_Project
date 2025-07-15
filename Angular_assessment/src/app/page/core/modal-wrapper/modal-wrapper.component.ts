import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal-wrapper',
  templateUrl: './modal-wrapper.component.html',
  styleUrl: './modal-wrapper.component.scss'
})
export class ModalWrapperComponent {
  @Input() public title?: string;
  @Output() public onClose = new EventEmitter<void>();

  constructor() { }

  handleClose(): void {
    this.onClose.emit();
  }
}
