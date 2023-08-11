import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Bouquet } from 'src/app/models/bouquet';

@Component({
  selector: 'app-bouquet',
  templateUrl: './bouquet.component.html',
  styleUrls: ['./bouquet.component.scss']
})
export class BouquetComponent implements OnInit{
  
  @Input() bouquet: Bouquet | null= null;
  @Output() onClick: EventEmitter<number> = new EventEmitter<number>
  
  constructor() {}

  ngOnInit(): void {
    
  };

}
