import { DatePipe } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Order } from 'src/app/models/order';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
  providers: [DatePipe]
})
export class OrderComponent implements OnInit{

  @Input() order: Order | null= null;
  imgPath: string = environment.api;

  constructor() {}

  ngOnInit(): void {
    
  }

}
