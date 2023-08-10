import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StoreModule } from '@ngrx/store';
import { AppState } from './app.state';
import { userReducer } from './store/user/user.reducer';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/user/user.effects';
import { InterceptorService } from './auth/interceptor';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatRippleModule } from '@angular/material/core';
import { MatChipsModule } from '@angular/material/chips';
import { MatBadgeModule } from '@angular/material/badge';
import { DialogModule } from '@angular/cdk/dialog';
import {MatDialogModule} from '@angular/material/dialog';
import {MatListModule} from '@angular/material/list';
import { cityReducer } from './store/city/city.reducer';
import { CityEffects } from './store/city/city.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { CityListComponent } from './components/city-list/city-list.component';
import { AddCityComponent } from './components/add-city/add-city.component';
import { BouquetTypeListComponent } from './components/bouquet-type-list/bouquet-type-list.component';
import { AddBouquetTypeComponent } from './components/add-bouquet-type/add-bouquet-type.component'
import { bouquetTypeReducer } from './store/bouquet-type/bouquet-type.reducer';
import { BouquetEffects } from './store/bouquet-type/bouquet-type.effects';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { MyStoresComponent } from './components/my-stores/my-stores.component';
import { AddStoreComponent } from './components/add-store/add-store.component';
import { FloverShopEffects } from './store/flover-shop/flover-shop.effects';
import { shopReducer } from './store/flover-shop/flover-shop.reducer';
import { EditStoreComponent } from './components/edit-store/edit-store.component';
import { StoreDetailsComponent } from './components/store-details/store-details.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    CityListComponent,
    AddCityComponent,
    BouquetTypeListComponent,
    AddBouquetTypeComponent,
    EditProfileComponent,
    MyStoresComponent,
    AddStoreComponent,
    EditStoreComponent,
    StoreDetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    StoreModule.forRoot<AppState>({
      user: userReducer,
      cities: cityReducer,
      types: bouquetTypeReducer,
      shop: shopReducer,
    }),
    EffectsModule.forRoot([
      UserEffects,
      CityEffects,
      BouquetEffects,
      FloverShopEffects
    ]),

    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      autoPause: true,
    }),

    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatMenuModule,
    MatDividerModule,
    MatStepperModule,
    MatSelectModule,
    DragDropModule,
    MatRippleModule,
    MatChipsModule,
    MatBadgeModule,
    DialogModule,
    MatDialogModule,
    MatListModule,
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
