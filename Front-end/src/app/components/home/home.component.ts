import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  user: User | null=null;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.store.subscribe((state) => (this.user=state.user.user));
  };

}
