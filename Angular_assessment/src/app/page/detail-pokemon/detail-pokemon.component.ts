import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-detail-pokemon',
  templateUrl: './detail-pokemon.component.html',
  styleUrl: './detail-pokemon.component.scss'
})
export class DetailPokemonComponent implements OnInit {
  constructor(public dialogRef: MatDialogRef<DetailPokemonComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {

  }
  ngOnInit(): void {
    console.log("data", this.data);

  }
  handleClose() {
    this.dialogRef.close();
  }
  static getComponent(): typeof DetailPokemonComponent {
    return DetailPokemonComponent;
  }
}
