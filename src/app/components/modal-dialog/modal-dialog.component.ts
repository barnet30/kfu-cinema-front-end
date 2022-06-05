import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.scss']
})
export class ModalDialogComponent implements OnInit {
  // @Input() header: string;
	// @Input() description: string;
	// @Output() isConfirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

	// private confirm() {
	// 	this.isConfirmed.emit(true);
	// }
	// private close() {
	// 	this.isConfirmed.emit(false);
	// }

  // constructor() { }

  ngOnInit(): void {
  }

}
