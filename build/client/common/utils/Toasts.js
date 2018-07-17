import { toast } from 'react-toastify';
function success(messages) {
    toast.success(messages, {
        position: toast.POSITION.TOP_CENTER,
    });
}
function info(messages) {
    toast.info(messages, {
        position: toast.POSITION.TOP_CENTER,
    });
}
function warn(messages) {
    toast.warn(messages, {
        position: toast.POSITION.TOP_CENTER,
    });
}
function error(messages) {
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
//# sourceMappingURL=Toasts.js.map