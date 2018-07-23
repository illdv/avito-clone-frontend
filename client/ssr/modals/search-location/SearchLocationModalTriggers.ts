import store from '../../../common/store/index';

import { show, hide, showAndHideAll } from 'client/common/modal-juggler/module';
import { ModalNames } from 'client/common/modal-juggler/modalJugglerInterface';

export const showSearchLocationModal = () => store.dispatch(show(ModalNames.searchLocation));
export const hideSearchLocationModal = () => store.dispatch(hide(ModalNames.searchLocation));
export const showSearchLocationModalAndHideAll = () => store.dispatch(showAndHideAll(ModalNames.searchLocation));
