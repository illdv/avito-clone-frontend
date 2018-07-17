import store from '../../../common/store/index';

import { show, hide, showAndHideAll } from 'client/common/modal-juggler/module';
import { ModalNames } from 'client/common/modal-juggler/modalJugglerInterface';

export const showLoginModal = () => store.dispatch(show(ModalNames.login));
export const hideLoginModal = () => store.dispatch(hide(ModalNames.login));
export const showLoginAndHideAll = () => store.dispatch(showAndHideAll(ModalNames.login));
