import Cookies from "js-cookie";
import { HTTPError } from "./types/errorTypes";

export function fallbackHTTPError(error: HTTPError) {
    console.log(error);
    Cookies.set("statusCode", error.statusCode.toString(), { sameSite: "strict" });
    Cookies.set("message", error.message, { sameSite: "strict" });
    Cookies.set("subMessage", error.subMessage || "", { sameSite: "strict" });
    // redirect to error page
    window.location.href = "/error.html";
}

window.addEventListener("load", () => {
    const statusCode = Cookies.get("statusCode");
    const message = Cookies.get("message");
    const subMessage = Cookies.get("subMessage");

    if (statusCode && message && subMessage) {
        const statusCodeEl = document.getElementById("statusCode") as HTMLParagraphElement;
        const messageEl = document.getElementById("msg") as HTMLParagraphElement;
        const subMessageEl = document.getElementById("subMsg") as HTMLParagraphElement;

        statusCodeEl.innerText = statusCode;
        messageEl.innerText = message;
        subMessageEl.innerText = subMessage;
    }
    Cookies.remove("statusCode");
    Cookies.remove("message");
    Cookies.remove("subMessage");
}
);