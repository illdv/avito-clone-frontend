import store from '../../../common/store/index';

import { show, hide } from '../../../common/modal-juggler/module';
import { ModalNames } from '../../../common/modal-juggler/modalJugglerInterface';

export const showSellerModals = () => store.dispatch(show(ModalNames.seller));
export const hideSellerModal = () => store.dispatch(hide(ModalNames.seller));