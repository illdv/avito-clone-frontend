import { IAds, MyAdsStatus } from 'client/common/entities/user/modules/owned-ads/interfaces';

const isDisapproved = (ad: IAds) => ad.is_approved === false;
const isActive      = (ad: IAds) => ad.is_active === true;
const isCompleted   = (ad: IAds) => ad.is_completed === true;

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

export const generateId = () => {
	return Date.now().toString();
};