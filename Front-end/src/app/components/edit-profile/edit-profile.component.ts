import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { AppState } from 'src/app/app.state';
import { Roles } from 'src/app/enums/role';
import { City } from 'src/app/models/city';
import { User } from 'src/app/models/user';
import { loadCities } from 'src/app/store/city/city.actions';
import { loadCityList } from 'src/app/store/city/city.selector';
import { updateProfile } from 'src/app/store/user/user.actions';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit{
  
  user: User | null= null;
  cities$: Observable<City[]>= of([]);
  selectedCity: City | null = null;
  deliveryGuy: Boolean= false;

  imgPath: string = environment.api;
  imagePreview: string | null = null;
  selectedImage: File | null = null;
  selectedFileName: string | null = null;

  username =new FormControl('', [Validators.required]);
  name =new FormControl('', [Validators.required]);
  lastName =new FormControl('', [Validators.required]);
  email =new FormControl('', [Validators.required]);
  password =new FormControl('', [Validators.required]);
  phone =new FormControl('', [Validators.required]);
  address =new FormControl('', [Validators.required]);
  jmbg =new FormControl('', [Validators.required]);
  vehicle =new FormControl('', [Validators.required]);

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
        this.jmbg.setValue(this.user.JMBG);
        this.vehicle.setValue(this.user.vehicle);
      }
    });
    this.store.dispatch(loadCities());
    this.cities$= this.store.select(loadCityList);

    if(this.user?.role === Roles.DeliveryGuy){
      this.deliveryGuy= true;
    } else{
      this.deliveryGuy= false;
    }

    if(this.user?.profilePicture){
      this.imagePreview= this.user.profilePicture;
    }else {
      this.imagePreview= 'defaultUser.png';
    }
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
        (this.selectedCity !== this.user?.city)||
        (this.jmbg.value !== this.user?.JMBG)||
        (this.vehicle.value !== this.user?.vehicle) ||
        this.selectedImage) {
          const updatedUser = {
            ...this.user,
            username: this.username.value,
            name: this.name.value,
            lastName: this.lastName.value,
            email: this.email.value,
            phone: this.phone.value,
            address: this.address.value,
            vehicle: this.vehicle.value,
            JMBG: this.jmbg.value,
            city: this.selectedCity,
          };
          const formData = new FormData();

          formData.append('id', String(this.user?.id));
          if(this.selectedImage){
            formData.append('profilePicture', this.selectedImage!);
          }
          formData.append('username', this.username.value!);
          formData.append('name', this.name.value!);
          formData.append('lastName', this.lastName.value!);
          formData.append('email', this.email.value!);
          formData.append('phone', this.phone.value!);
          formData.append('address', this.address.value!);
          formData.append('cityId', String(this.selectedCity?.id));  
          if(this.user?.role === Roles.DeliveryGuy){
            formData.append('JMBG', this.jmbg.value!);
            formData.append('vehicle', this.vehicle.value!);
          }

          this.store.dispatch(updateProfile({ user: formData }));
    }
  };

  handleSelectedFile(event: any) {
    this.selectedImage = event.target.files[0];
    this.imagePreview = null;

    if (this.selectedImage) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagePreview = e.target.result;
      };
      reader.readAsDataURL(this.selectedImage);
    }

    this.selectedFileName= <string>this.selectedImage?.name;
  };
}
