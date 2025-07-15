import { Directive } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class AsyncDialog<ComponentType> {
  constructor(protected matDialog: MatDialog) {}

  abstract open(data): Promise<MatDialogRef<ComponentType>>;
}
