import { IAds } from 'client/common/ads/interface';

export enum MyAdsFilter {
	Disapproved = 'Disapproved',
	Active      = 'Active',
	Completed   = 'Completed',
}

const isDisapproved = (ad: IAds) => ad.is_approved === 1;
const isActive      = (ad: IAds) => ad.is_active === 1;
const isCompleted   = (ad: IAds) => ad.is_completed === 1;

export function filterMyAds(selectedFilter: MyAdsFilter, ads: IAds[]) {
	if (selectedFilter === MyAdsFilter.Active) {
		return ads.filter(isActive);
	}
	if (selectedFilter === MyAdsFilter.Completed) {
		return ads.filter(isCompleted);
	}
	if (selectedFilter === MyAdsFilter.Disapproved) {
		return ads.filter(isDisapproved);
	}
}