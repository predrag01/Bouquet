import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { loginUser } from 'src/app/store/user/user.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  email=new FormControl('', [Validators.required]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  hidePassword: boolean= true;

  constructor(private router: Router, private store: Store<AppState>) {}

  ngOnInit(): void {

  }

  togglePassword1() {
    this.hidePassword= !this.hidePassword;
  }

  navigate(path: string) {
    this.router.navigate([path]);
  }

  login() {
    if(!this.email.value || !this.password.value) {
      return;
    }

    this.store.dispatch(loginUser({ email: this.email.value, password: this.password.value }));
    
  }
}