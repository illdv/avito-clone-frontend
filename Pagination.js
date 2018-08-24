const currentPage = 4;
const total = 10;
const pages = new Array(total).fill(0).map((item, index) => index + 1);

function extractedCenter() {
	if (total <= 6) {
		return [];
	}
	if (currentPage <= 3) {
		return [];
	}
	let start = currentPage === 1 ? currentPage - 1 : currentPage - 2;
	return pages.slice(start, currentPage + 2);
}

function extractEnd() {
	return pages.slice(-3);
}

function extractStart() {
	return pages.slice(0, 3);
}

function getPagination() {
	const first = extractStart();
	const centerPage = extractedCenter();
	const end = extractEnd();

	if (total < 6) {
		return pages;
	}

	return [...first, ...centerPage, ...end];
}

let result = getPagination().reduce((acc, pagination) => {
	return { ...acc, [pagination]: pagination}
}, {});

console.log(getPagination());
console.log(Object.values(result));