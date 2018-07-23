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