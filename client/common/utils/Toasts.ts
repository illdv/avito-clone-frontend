import { toast } from 'react-toastify';

const position = toast.POSITION.BOTTOM_RIGHT;

function success(messages: string) {
	toast.success(messages, {
		position,
	});
}

function info(messages: string) {
	toast.info(messages, {
		position,
	});
}

function warn(messages: string) {
	toast.warn(messages, {
		position,
	});
}

function error(messages: string) {
	toast.error(messages, {
		position,
	});
}

export const Toasts = {
	success,
	info,
	warn,
	error,
};
