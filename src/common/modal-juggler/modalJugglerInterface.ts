export enum ModalNames {
    login,
    registration,
    forgotPassword
}

export interface IModal {
    name: ModalNames;
    zIndex: number;
}

export interface IModalJugglerState {
    modals: IModal[];
}