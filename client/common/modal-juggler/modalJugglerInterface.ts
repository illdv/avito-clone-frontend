export enum ModalNames {
    login = 'login',
    registration = 'registration',
    forgotPassword = 'forgotPassword',
    seller = 'seller'
}

export interface IModal {
    name: ModalNames;
    zIndex: number;
}

export interface IModalJugglerState {
    modals: IModal[];
}