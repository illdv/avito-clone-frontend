import store from '../../../common/store/index';

import { show, hide, showAndHideAll } from '../../../common/modal-juggler/module';
import { ModalNames } from '../../../common/modal-juggler/modalJugglerInterface';

export const showForgotPasswordModal = () => store.dispatch(show(ModalNames.forgotPassword));
export const hideForgotPasswordModal = () => store.dispatch(hide(ModalNames.forgotPassword));
export const showForgotPasswordModalAndHideAll = () => store.dispatch(showAndHideAll(ModalNames.forgotPassword));