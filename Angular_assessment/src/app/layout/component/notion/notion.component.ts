import { Component, Inject, OnInit } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { delay, of } from 'rxjs';

@Component({
  selector: 'app-notion',
  templateUrl: './notion.component.html',
  styleUrl: './notion.component.scss'
})
export class NotionComponent implements OnInit {
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit() {
    if (!this.data.showUndoButton || (this.data.undoButtonDuration >= this.data.duration)) {
      return;
    }

    this.delayForUndoButton(this.data.undoButtonDuration).subscribe(() => {
      this.data.showUndoButton = false;
    });
  }

  /*
   *	Returns delay
   *
   * @param timeToDelay: any
   */
  delayForUndoButton(timeToDelay) {
    return of('').pipe(delay(timeToDelay));
  }

  /**
   * Dismiss with Action
   */
  onDismissWithAction() {
    this.data.snackBar.dismiss();
  }

  /**
   * Dismiss
   */
  public onDismiss() {
    this.data.snackBar.dismiss();
  }
}
