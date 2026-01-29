
import toastr from "toastr";
import "toastr/build/toastr.min.css";

export const showToast = (message = "Something Went Wrong ", type = "error", title = '') => {
    toastr.options = {
        extendedTimeOut: "1000",
        hideDuration: "500",
        hideEasing: "linear",
        hideMethod: "fadeOut",
        newestOnTop: true,
        positionClass: "toast-bottom-right",
        preventDuplicates: false,
        progressBar: true,
        closeButton: true,
        debug: false,
        showDuration: "300",
        showEasing: "swing",
        showMethod: "fadeIn",
        timeOut: "5000",
    };
    if (type === "info") toastr.info(message, title);
    else if (type === "warning") toastr.warning(message, title);
    else if (type === "error") toastr.error(message, title);
    else toastr.success(message, title);
}
