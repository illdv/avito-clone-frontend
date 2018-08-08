const store = {}; // Singleton

export const setToStore = (prepareName, value) => {
	store[prepareName] = value;
	return store;
};

export const getFromStore = prepareName => store[prepareName];