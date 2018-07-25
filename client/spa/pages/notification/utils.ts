import { FilterType } from 'client/spa/pages/notification/Notification';
import { INotification } from 'client/common/notification/interface';

const isRead   = (item: INotification) => item.isRead === true;
const isNoRead = (item: INotification) => item.isRead === false;

export function filterNotification(selectedFilter: FilterType, items: INotification[]) {
	if (selectedFilter === FilterType.NoRead) {
		return items.filter(isNoRead);
	}
	if (selectedFilter === FilterType.Read) {
		return items.filter(isRead);
	}
	if (selectedFilter === FilterType.All) {
		return items;
	}
}