import Cookies from 'js-cookie';

window.addEventListener("load", () => {
    const resCode = Cookies.get("resCode");
    const errorText = Cookies.get("errorText");
    const errorSubText = Cookies.get("errorSubText");

    const resCodeEl = document.getElementById("resCode") as HTMLHeadingElement;
    const errorTextEl = document.getElementById("errorText") as HTMLHeadingElement;
    const errorSubTextEl = document.getElementById("errorSubText") as HTMLHeadingElement;

    if (resCode && errorText && errorSubText) {



        resCodeEl.innerText = resCode;
        errorTextEl.innerText = errorText;
        errorSubTextEl.innerText = errorSubText;
    }
    else {
        resCodeEl.innerText = "418";
        errorTextEl.innerText = "I'm a teapot";
        errorSubTextEl.innerText = "Nezaznamenali jsme žádnou chybu. Jste tu správně?";
    }

    Cookies.remove("resCode");
    Cookies.remove("errorText");
    Cookies.remove("errorSubText");
});