import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FloverShop } from 'src/app/models/store';

@Component({
  selector: 'app-home-item',
  templateUrl: './home-item.component.html',
  styleUrls: ['./home-item.component.scss']
})
export class HomeItemComponent implements OnInit{
  
  @Input() floverShop: FloverShop | null= null;
  @Output() onClick: EventEmitter<number> = new EventEmitter<number>

  constructor() {}

  ngOnInit(): void {
  };

  floverShopEmit() {
    if(this.floverShop)
    {
      this.onClick.emit(this.floverShop.id);
    }
  };
}
