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
import { AddBouquetComponent } from './components/add-bouquet/add-bouquet.component';
import { BouquetComponent } from './components/bouquet/bouquet.component';
import { bouquetReducer } from './store/bouquet/bouquet.reducer';
import { BouquetTypeEffects } from './store/bouquet/bouquet.effects';
import { EditBouquetComponent } from './components/edit-bouquet/edit-bouquet.component';
import { shoppingCartReducer } from './store/shopping-cart/shopping-cart.reducer';
import { ShoppingCartEffects } from './store/shopping-cart/shopping-cart.effects';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { ShoppingCartItemComponent } from './components/shopping-cart-item/shopping-cart-item.component';
import { OrderConfirmationComponent } from './components/order-confirmation/order-confirmation.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { StoreOrdersComponent } from './components/store-orders/store-orders.component'; 
import { orderReducer } from './store/order/order.reducer';
import { OrderEffects } from './store/order/order.effects';
import { OrderComponent } from './components/order/order.component';
import { DeliveryComponent } from './components/delivery/delivery.component';

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
    AddBouquetComponent,
    BouquetComponent,
    EditBouquetComponent,
    ShoppingCartComponent,
    ShoppingCartItemComponent,
    OrderConfirmationComponent,
    StoreOrdersComponent,
    OrderComponent,
    DeliveryComponent,
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
      bouquet: bouquetReducer,
      shoppingCart: shoppingCartReducer,
      order: orderReducer,
    }),
    EffectsModule.forRoot([
      UserEffects,
      CityEffects,
      BouquetTypeEffects,
      FloverShopEffects,
      BouquetEffects,
      ShoppingCartEffects,
      OrderEffects,
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
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: InterceptorService, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
