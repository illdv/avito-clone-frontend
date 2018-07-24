import { createSelector } from 'reselect';

import { IRootState } from './storeInterface';

const getState = (state: IRootState) => state;
const getModalJuggler = createSelector(getState, state => state.modalJuggler);

export const getModals = createSelector(getModalJuggler, modalJuggler => modalJuggler.modals);
export const getLocationState = createSelector(getState, state => state.location);