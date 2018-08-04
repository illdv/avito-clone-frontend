export interface IControlButtonsProps {
	ads: IAd[];
	options: IActiveButtonConfig[];
	changeAll(id: number[]): void;
	selectedAll: boolean;
	selectedIds: Set<number>;
}

export interface IControlButtonsState {
	ids: number[];
	options: IActiveButtonConfig[];
}

export interface IActiveButtonConfig {
	label: string;
	className: string;
	callback(id: Set<number>): void;
}

export interface IActiveButtonProps {
	id: Set<number>;
	option: IActiveButtonConfig;
}