import { toast } from 'react-toastify';

function success(messages: string) {
    toast.success(messages, {
        position: toast.POSITION.TOP_CENTER,
    });
}

function info(messages: string) {
    toast.info(messages, {
        position: toast.POSITION.TOP_CENTER,
    });
}

function warn(messages: string) {
    toast.warn(messages, {
        position: toast.POSITION.TOP_CENTER,
    });
}

function error(messages: string) {
    toast.error(messages, {
        position: toast.POSITION.TOP_CENTER,
    });
}

export const Toasts = {
    success,
    info,
    warn,
    error,
};
