import store from '../../../common/store/index';

import { show, hide, showAndHideAll } from 'client/common/modal-juggler/module';
import { ModalNames } from 'client/common/modal-juggler/modalJugglerInterface';

export const showLocationModal = () => store.dispatch(show(ModalNames.location));
export const hideLocationModal = () => store.dispatch(hide(ModalNames.location));
export const showLocationModalAndHideAll = () => store.dispatch(showAndHideAll(ModalNames.location));
