import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchComponent } from './search/search.component';
import { ModalWrapperComponent } from './modal-wrapper/modal-wrapper.component';
import { PopoverComponent } from './popover/popover.component';

@NgModule({
  declarations: [
    SearchComponent,
    ModalWrapperComponent,
    PopoverComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule,],
  exports: [CommonModule, FormsModule, ReactiveFormsModule, SearchComponent,
    ModalWrapperComponent,
    PopoverComponent,]
})
export class CoreModule { }
