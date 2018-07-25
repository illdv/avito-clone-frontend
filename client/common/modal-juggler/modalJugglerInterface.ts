export enum ModalNames {
	login           = 'login',
	registration    = 'registration',
	sendCodeToEmail = 'sendCodeToEmail',
	forgotPassword  = 'forgotPassword',
	seller          = 'seller',
	success         = 'success',
	location        = 'location',
	searchLocation  = 'searchLocation',
}

export interface IModal {
	name: ModalNames;
	zIndex: number;
}

export interface IModalJugglerState {
	modals: IModal[];
}