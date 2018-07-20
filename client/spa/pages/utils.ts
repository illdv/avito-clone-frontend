import { IAds } from 'client/common/ads/interface';

export enum MyAdsStatus {
	Disapproved = 'Disapproved',
	Active      = 'Active',
	Completed   = 'Completed',
}

const isDisapproved = (ad: IAds) => ad.is_approved === 0;
const isActive      = (ad: IAds) => ad.is_active === 1;
const isCompleted   = (ad: IAds) => ad.is_completed === 1;

export function filterMyAds(selectedFilter: MyAdsStatus, ads: IAds[]) {
	if (selectedFilter === MyAdsStatus.Active) {
		return ads.filter(isActive);
	}
	if (selectedFilter === MyAdsStatus.Completed) {
		return ads.filter(isCompleted);
	}
	if (selectedFilter === MyAdsStatus.Disapproved) {
		return ads.filter(isDisapproved);
	}
}