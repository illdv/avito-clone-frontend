import { createSelector } from 'reselect';
const getState = (state) => state;
const getModalJuggler = createSelector(getState, state => state.modalJuggler);
export const getModals = createSelector(getModalJuggler, modalJuggler => modalJuggler.modals);
//# sourceMappingURL=selectors.js.map