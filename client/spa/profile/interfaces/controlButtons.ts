export interface IControlButtonsProps {
	options: any[];
	ads: IOwnedAdsState;
	selected: (id: number[]) => void;
}

export interface IControlButtonsState {
	ids: number[];
}