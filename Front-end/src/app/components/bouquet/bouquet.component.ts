import { Component, Input, OnInit } from '@angular/core';
import { Bouquet } from 'src/app/models/bouquet';

@Component({
  selector: 'app-bouquet',
  templateUrl: './bouquet.component.html',
  styleUrls: ['./bouquet.component.scss']
})
export class BouquetComponent implements OnInit{
  
  @Input() bouquet: Bouquet | null= null;
  
  constructor() {}

  ngOnInit(): void {
    
  }

}
