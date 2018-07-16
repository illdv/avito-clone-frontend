import { createReducer, createAction } from 'redux-act';

import { ModalNames, IModal, IModalJugglerState } from './modalJugglerInterface';

const REDUCER = 'MODAL';
const NS      = `${REDUCER}__`;

export const SHOW                    = `${NS}SHOW`;
export const HIDE                    = `${NS}HIDE`;
export const HIDE_ALL                = `${NS}HIDE_ALL`;
export const SHOW_AND_HIDE_ALL       = `${NS}SHOW_AND_HIDE_ALL`;
export const SHOW_AND_HIDE_SPECIFIED = `${NS}SHOW_AND_HIDE_SPECIFIED`;

export const show                 = createAction(SHOW, (name: ModalNames) => name);
export const hide                 = createAction(HIDE, (name: ModalNames) => name);
export const hideAll              = createAction(HIDE_ALL);
export const showAndHideAll       = createAction(SHOW_AND_HIDE_ALL, (name: ModalNames) => name);
export const showAndHideSpecified = createAction(SHOW_AND_HIDE_SPECIFIED, (data: { name: ModalNames, specefied: ModalNames[] }) => data);

const defaultState: IModalJugglerState = {
  modals: []
};

const reducer = createReducer({}, defaultState);

reducer.on(show, (state, payload): IModalJugglerState => {
    const modal: IModal = { name: payload, zIndex: state.modals.length + 100 };

    return {
        ...state,
        modals: [ ...state.modals, modal ]
    }
});

reducer.on(hide, (state, payload): IModalJugglerState => ({
    ...state,
    modals: state.modals.filter((modal: IModal) => modal.name !== payload)
}));

reducer.on(hideAll, (state): IModalJugglerState => ({
    ...state,
    modals: []
}));

reducer.on(showAndHideAll, (state, payload): IModalJugglerState => ({
    ...state,
    modals: [ { name: payload, zIndex: 100 } ]
}))

reducer.on(showAndHideSpecified, (state, payload): IModalJugglerState => {
    const filteredModals = state.modals.filter((modal: IModal) => {
        return payload.specefied.indexOf(modal.name) === -1;// If not found, then true
    })

    return {
        ...state,
        modals: filteredModals.concat({ name: payload.name, zIndex: filteredModals.length })
    }
});

export default reducer;