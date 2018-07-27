import store from 'client/common/store/index';

import { show, hide } from 'client/common/modal-juggler/module';
import { ModalNames } from 'client/common/modal-juggler/modalJugglerInterface';

export const showConfirmationAccountDeletionModal = () => store.dispatch(show(ModalNames.confirmationAccountDeletion));
export const hideConfirmationAccountDeletionModal = () => store.dispatch(hide(ModalNames.confirmationAccountDeletion));
