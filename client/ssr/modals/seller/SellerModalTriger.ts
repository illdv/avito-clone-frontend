import store from '../../../common/store/index';

import { ModalNames } from 'client/common/modal-juggler/modalJugglerInterface';
import { hide, show } from 'client/common/modal-juggler/module';

export const showSellerModals = () => store.dispatch(show(ModalNames.seller));
export const hideSellerModal = () => store.dispatch(hide(ModalNames.seller));