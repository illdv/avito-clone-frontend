import store from '../../../common/store/index';

import { show, hide, showAndHideAll, hideAll } from '../../../common/modal-juggler/module';
import { ModalNames } from '../../../common/modal-juggler/modalJugglerInterface';

export const hideAllModal           = () => store.dispatch(hideAll());

export const showSendCodeToEmailModal          = () => store.dispatch(show(ModalNames.sendCodeToEmail));
export const hideSendCodeToEmailModal          = () => store.dispatch(hide(ModalNames.sendCodeToEmail));
export const showSendCodeToEmailModalAndHideAll = () => store.dispatch(showAndHideAll(ModalNames.sendCodeToEmail));

export const showForgotPasswordModal = () => store.dispatch(show(ModalNames.forgotPassword));
export const hideForgotPasswordModal = () => store.dispatch(hide(ModalNames.forgotPassword));
export const showForgotPasswordModalAndHideAll = () => store.dispatch(showAndHideAll(ModalNames.forgotPassword));
