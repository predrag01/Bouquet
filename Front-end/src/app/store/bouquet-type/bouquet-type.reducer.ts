import { EntityState, createEntityAdapter } from "@ngrx/entity";
import { createReducer, on } from "@ngrx/store";
import { BouquetType } from "src/app/models/bouquet-type";
import * as TypeActions from './bouquet-type.actions'

export interface BouquetTypeState extends EntityState<BouquetType> {
    selectedCity: number;
};

const adapter = createEntityAdapter<BouquetType>();

export const initialSate: BouquetTypeState = adapter.getInitialState({
    selectedCity: 0,
});

export const bouquetTypeReducer = createReducer(
    initialSate,
    on(TypeActions.addTypeSuccess, (state, { bouquetType }) => adapter.addOne(bouquetType, state)),
    on(TypeActions.loadTypeListSuccess, (state, { types }) => adapter.setAll(types, state)),
    on(TypeActions.deleteTypeSuccess, (state, { id }) => adapter.removeOne(id, state)),
    on(TypeActions.selectType, (state, { id }) => ({...state, selectedCity:id})),
    on(TypeActions.deselectType, (state) => ({...state, selectedCity:0})),
    on(TypeActions.updateTypeSuccess, (state, {id, name}) => adapter.updateOne({
        id: id,
        changes: {
            type: name
        }
    },
    state
    ))
);