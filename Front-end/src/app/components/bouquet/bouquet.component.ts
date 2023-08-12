import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Bouquet } from 'src/app/models/bouquet';

@Component({
  selector: 'app-bouquet',
  templateUrl: './bouquet.component.html',
  styleUrls: ['./bouquet.component.scss']
})
export class BouquetComponent implements OnInit{
  
  @Input() bouquet: Bouquet | null= null;
  @Output() onClick: EventEmitter<number> = new EventEmitter<number>

  number = new FormControl('', [Validators.required]);
  
  constructor() {}

  ngOnInit(): void {
    this.number.setValue("1")
  };

  orderEmit() {
    if(this.bouquet && this.number.value) {
      this.onClick.emit(this.bouquet.id);
    }
  };

}
