import { showToast } from "../components/Common/ToasConfig";
import i18n from "../i18n";

export const getErrorMessage = (err: any, isShowToast = false) => {
    let errorMessage;
    if (typeof err.response?.data == "string")
        errorMessage = err.response?.data;
    if (err.response?.data?.errors) {
        for (const key in err.response?.data?.errors) {
            errorMessage = err.response?.data?.errors[key][0];
            break;
        }
    }
    if (err.response?.data?.message)
        errorMessage = err.response?.data?.message
    if (!errorMessage) {
        errorMessage = i18n.language === "en" ? "Something went wrong" : "حدث خطأ ما";
        if (err.response?.status === 403) {
            errorMessage = "ليس لديك الصلاحية الكافية"
        }
    }

    if (isShowToast)
        showToast(errorMessage);

    return errorMessage
}
export const errorPageRedirect = () => {
    // if (window.location.pathname !== ReraRoutes.ERROR)
    //     window.location.href = ReraRoutes.ERROR
}
export const showMessage = (messages?: string) => {
    if (messages)
        showToast(
            messages,
            "success"
        )
    else
        showToast(i18n.language === "ar" ? "تم حفظ البيانات بنجاح" : "Saved Successfully", "success")
}