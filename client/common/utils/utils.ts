export function isServer(): boolean {
	return typeof window === 'undefined';
}

export function pushInRouter(href: string) {
	// window.location.href = href;
}