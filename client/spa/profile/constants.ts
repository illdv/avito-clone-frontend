export const profilePagePath = '/profile';

// my-ads
export const myAdsPagePath = `${profilePagePath}/my-ads`;
export const myActiveAdsPagePath = `${myAdsPagePath}/active`;
export const myCompletedAdsPagePath = `${myAdsPagePath}/completed`;
export const myDisapprovedAdsPagePath = `${myAdsPagePath}/disapproved`;

// notification
export const notificationPagePath = `${profilePagePath}/notification`;

// profile settings
export const profileSettingsPagePath = `${profilePagePath}/settings`;

// create ad
export const createAdPagePagePath = `${profilePagePath}/ad/create`;

// edit ad
export const editAdPagePath = `${profilePagePath}/ad/edit/:id`;
export const editAdPagePathCreator = (id: number) => `${profilePagePath}/ad/edit/${id}`;

export const defaultPagePath = myActiveAdsPagePath;