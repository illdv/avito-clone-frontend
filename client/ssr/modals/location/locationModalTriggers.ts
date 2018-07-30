import store from '../../../common/store/index';

import { show, hide, showAndHideAll } from '../../../common/modal-juggler/module';
import { ModalNames } from '../../../common/modal-juggler/modalJugglerInterface';

export const showLocationModal = (name: ModalNames) => store.dispatch(show(name));
export const hideLocationModal = (name: ModalNames) => store.dispatch(hide(name));
export const showLocationModalAndHideAll = (name: ModalNames) => store.dispatch(showAndHideAll(name));
