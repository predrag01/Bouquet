import { Injectable } from "@angular/core";
import * as ShopActions from './flover-shop.actions'
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { FloverShopService } from "src/app/services/flover-shop.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError, map, merge, mergeMap, of } from "rxjs";
import { FloverShop } from "src/app/models/store";

@Injectable()
export class FloverShopEffects {
    
    constructor(private actions$: Actions, private shopService: FloverShopService, private snackBar: MatSnackBar) {}

    createShop$ = createEffect(() => 
    this.actions$.pipe(
        ofType(ShopActions.createShop),
        mergeMap(({ formData }) => this.shopService.create(formData).pipe(
            map((shop) => {
                this.snackBar.open("Store successfully created", "Ok", { duration: 3000 })
                return ShopActions.createShopSuccess({ shop: shop })
            }),
            catchError( ({error}) => {
                this.snackBar.open(error, 'Close', { duration: 3000});
                return  of({type: 'Load error'});
            })
        ))
    ));

    loadMyStores$ = createEffect(() =>
    this.actions$.pipe(
        ofType(ShopActions.loadMyStoreList),
        mergeMap(({ id }) => this.shopService.getMyStores(id).pipe(
            map((stores) => ShopActions.loadMyStoreListSuccess({ shops: stores})),
            catchError( ({error}) => {
                this.snackBar.open(error, 'Close', { duration: 3000});
                return  of({type: 'Load error'});
            })
        ))
    ));

    deleteStore$ = createEffect(() =>
    this.actions$.pipe(
        ofType(ShopActions.deleteStore),
        mergeMap(({ id }) => this.shopService.deleteStore(id).pipe(
            map(() => {
                this.snackBar.open("Store successfully deleted", "Ok", { duration: 3000 })
                return ShopActions.deleteStoreSuccess({ id: id })
            }),
            catchError( ({error}) => {
                this.snackBar.open(error, 'Close', { duration: 3000});
                return  of({type: 'Load error'});
            })
        ))
    ));

    updateShop$ =createEffect(() =>
    this.actions$.pipe(
        ofType(ShopActions.updateShop),
        mergeMap(({ shop }) => this.shopService.updateShop(shop).pipe(
            map((shop: FloverShop) => {
                this.snackBar.open("Store successfully updated", "Ok", { duration: 3000 })
                return ShopActions.updateShopSuccess({ shop: shop });
            }),
            catchError( ({error}) => {
                this.snackBar.open(error, 'Close', { duration: 3000});
                return  of({type: 'Load error'});
            })
        ))
    ));

    loadOneShop$ =createEffect(() =>
    this.actions$.pipe(
        ofType(ShopActions.loadOneStore),
        mergeMap(({ id }) => this.shopService.loadOneShop(id).pipe(
            map((shop) => ShopActions.loadOneStoreSuccess({ shop: shop }))
        )),
        catchError( ({error}) => {
            this.snackBar.open(error, 'Close', { duration: 3000});
            return  of({type: 'Load error'});
        })
    ));

    addEmployee$ = createEffect(() =>
    this.actions$.pipe(
        ofType(ShopActions.addEmployee),
        mergeMap(({ email, shopId }) =>this.shopService.addEmployee(email, shopId).pipe(
            map((shop) => {
                this.snackBar.open("Successfully added employee", "Ok", { duration: 3000 })
                return ShopActions.addEmployeeSuccess({ shop: shop });
            }),
            catchError( ({error}) => {
                this.snackBar.open(error, 'Close', { duration: 3000});
                return  of({type: 'Load error'});
            })
        ))
    ));

    removeEmployee$ = createEffect(() =>
    this.actions$.pipe(
        ofType(ShopActions.removeEmployee),
        mergeMap(({ userId, shopId }) =>this.shopService.removeEmployee(userId, shopId).pipe(
            map((shop) => {
                this.snackBar.open("Successfully removed employee", "Ok", { duration: 3000 })
                return ShopActions.removeEmployeeSuccess({ shop: shop });
            }),
            catchError( ({error}) => {
                this.snackBar.open(error, 'Close', { duration: 3000});
                return  of({type: 'Load error'});
            })
        ))
    ));

    loadStoresForHome$ = createEffect(() =>
    this.actions$.pipe(
        ofType(ShopActions.loadFloverShopForHome),
        mergeMap(({ cityId }) => this.shopService.loadFloverStoresForHome(cityId).pipe(
            map(( floverStores: FloverShop[]) => ShopActions.loadFloverShopForHomeSuccess({ floverStores })),
            catchError( ({error}) => {
                this.snackBar.open(error, 'Close', { duration: 3000});
                return  of({type: 'Load error'});
            })
        ))
    ));

    loadAllFlowerShop$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ShopActions.loadAllStores),
            mergeMap(() => this.shopService.loadAll().pipe(
                map(( floverStores: FloverShop[]) => ShopActions.loadAllStoresSuccess({ stores: floverStores }))
            )),
            catchError( ({error}) => {
                this.snackBar.open(error, 'Close', { duration: 3000});
                return  of({type: 'Load error'});
            })
        )
    );

    loadEmployeeFlowerShop$ = createEffect(() =>
        this.actions$.pipe(
            ofType(ShopActions.loadEmployeeStore),
            mergeMap(({ id }) => this.shopService.loadEmployeeStore(id).pipe(
                map(( floverStore: FloverShop) => ShopActions.loadEmployeeStoreSuccess({ store: floverStore }))
            )),
            catchError( ({error}) => {
                this.snackBar.open(error, 'Close', { duration: 3000});
                return  of({type: 'Load error'});
            })
        )
    );
}