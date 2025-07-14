// Angular
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotionComponent } from '../component/notion/notion.component';
// Partials for CRUD

export enum MessageType {
	Create,
	Read,
	Update,
	Delete
}

@Injectable()
export class LayoutUtilsService {
	/**
	 * Service constructor
	 *
	 * @param snackBar: MatSnackBar
	 * @param dialog: MatDialog
	 */
	constructor(private snackBar: MatSnackBar,
		private dialog: MatDialog) { }

	/**
	 * Showing (Mat-Snackbar) Notification
	 *
	 * @param message: string
	 * @param type: MessageType
	 * @param duration: number
	 * @param showCloseButton: boolean
	 * @param showUndoButton: boolean
	 * @param undoButtonDuration: number
	 * @param verticalPosition: 'top' | 'bottom' = 'top'
	 *  * @param horizontalPosition: 'start' | 'start' = 'start'
	 * 	
	
	 */

	showInfo(
		_message: string,
		_type: MessageType = MessageType.Create,
		_duration: number = 10000,
		_showCloseButton: boolean = true,
		_showUndoButton: boolean = true,
		_undoButtonDuration: number = 3000,
		_horizontalPosition: any = "center",
		mean: 0 | 1 = 1
	) {
		const _data = {
			message: _message,
			snackBar: this.snackBar,
			showCloseButton: _showCloseButton,
			showUndoButton: _showUndoButton,
			undoButtonDuration: _undoButtonDuration,
			type: _type,
			action: 'Undo',
			horizontalPosition: _horizontalPosition,
			meanMes: mean,
		};

		return this.snackBar.openFromComponent(NotionComponent, {
			duration: _duration,
			data: _data,
			horizontalPosition: _horizontalPosition,
			verticalPosition: 'top',
			panelClass: ['custom-snackbar'],
		});
	}




}
