import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { City } from 'src/app/models/city';
import { User } from 'src/app/models/user';
import { loadCities } from 'src/app/store/city/city.actions';
import { loadCityList } from 'src/app/store/city/city.selector';
import { updateProfile } from 'src/app/store/user/user.actions';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit{
  
  user: User | null= null;
  cities$: Observable<City[]>= of([]);
  selectedCity: City | null = null;

  username =new FormControl('', [Validators.required]);
  name =new FormControl('', [Validators.required]);
  lastName =new FormControl('', [Validators.required]);
  email =new FormControl('', [Validators.required]);
  password =new FormControl('', [Validators.required]);
  phone =new FormControl('', [Validators.required]);
  address =new FormControl('', [Validators.required]);

  hidePassword: boolean= true;

  constructor(private store: Store<AppState>) {}
  
  ngOnInit(): void {
    this.store.subscribe((state) => {
      this.user=state.user.user;
      if(this.user) {
        this.username.setValue(this.user.username);
        this.name.setValue(this.user.name);
        this.lastName.setValue(this.user.lastName);
        this.email.setValue(this.user.email);
        this.password.setValue(this.user.password);
        this.phone.setValue(this.user.phone);
        this.address.setValue(this.user.address);
        this.selectedCity=this.user.city;
      }
    });
    this.store.dispatch(loadCities());
    this.cities$= this.store.select(loadCityList);
  };

  togglePassword() {
    this.hidePassword= !this.hidePassword;
  };

  onCitySelectionChange(event: any) {
    this.selectedCity=event.value;
  };

  save() {
    if((this.username.value !== this.user?.username) || 
        (this.name.value !== this.user?.name) ||
        (this.lastName.value !== this.user?.lastName) ||
        (this.email.value !== this.user?.email) ||
        (this.phone.value !== this.user?.phone) ||
        (this.address.value !== this.user?.address) ||
        (this.selectedCity !== this.user?.city)) {
          const updatedUser = {
            ...this.user,
            username: this.username.value,
            name: this.name.value,
            lastName: this.lastName.value,
            email: this.email.value,
            phone: this.phone.value,
            address: this.address.value,
            city: this.selectedCity
          };

          this.store.dispatch(updateProfile({ user: <User>updatedUser }));
    }
  };

}
