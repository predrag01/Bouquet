import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Roles } from 'src/app/enums/role';
import { User } from 'src/app/models/user';
import { updateProfile } from 'src/app/store/user/user.actions';

@Component({
  selector: 'app-register-as',
  templateUrl: './register-as.component.html',
  styleUrls: ['./register-as.component.scss']
})
export class RegisterAsComponent implements OnInit{

  jmbg=new FormControl('', [Validators.required]);
  veihcleForDelivery=new FormControl('', [Validators.required]);
  
  user: User | null = null;
  constructor(private store: Store<AppState>, private dialog: MatDialogRef<RegisterAsComponent>){}

  ngOnInit(): void {
    this.store.subscribe((state) => this.user=state.user.user);
  };

  register(){
    const newUser = {
      ...this.user,
      JMBG: <string>this.jmbg.value,
      vehicle: <string>this.veihcleForDelivery.value,
      role: Roles.DeliveryGuy,
    };

    this.store.dispatch(updateProfile({ user: <User>newUser }));

    this.dialog.close();
  };
}
