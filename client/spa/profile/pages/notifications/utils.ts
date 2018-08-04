import { FilterType } from './interface';

const isRead   = (item: INotification) => item.read_at !== null;
const isNoRead = (item: INotification) => !isRead(item);

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