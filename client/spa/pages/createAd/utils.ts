/**
 *  Use for check object by id.
 */
export const isContainsId = (id: string) => (checkedItem: { id: string }) => {
	if (checkedItem) {
		return checkedItem.id === id;
	} else {
		return false;
	}
};

export function useOrDefault<T>(func: () => T, defaultValue: T): T {
	try {
		return func();
	} catch (e) {
		return defaultValue;
	}
}

export function removeElementByIndex(array: any[], index: number) {
	return [
		...array.slice(0, index),
		...array.slice(index + 1),
	];
}