"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
function getFormData(id) {
    let form = document.getElementById(id);
    let formData = new FormData(form);
    let data = {
        from_date: new Date(formData.get("from_date")),
        to_date: new Date(formData.get("to_date")),
        on_date: new Date(formData.get("on_date")),
        is_red: formData.get("is_red") === "true" ? true : false,
    };
    return data;
}
function handleSubmit(event) {
    event.preventDefault();
    const values = getFormData("form");
    // if all date fields are empty alert user
    if (values.from_date.toDateString() === "Invalid Date" && values.to_date.toDateString() === "Invalid Date" && values.on_date.toDateString() === "Invalid Date") {
        console.log("all empty");
        alert("Prosím vyplňte pole 'Od', 'Do', nebo 'Dne'");
        return;
    }
    // if from_datetime or to_datetime are empty alert user
    if ((values.from_date.toDateString() === "Invalid Date" || values.to_date.toDateString() === "Invalid Date") && values.on_date.toDateString() !== "Invalid Date") {
        alert("Prosím vyplňte pole 'Od' a 'Do'");
        return;
    }
    getTableEntries(values, { url: "localhost", port: 8000 }).then((data) => {
        console.log(data);
    });
}
function handleDateChange(event) {
    // if from_datetime or to_datetime is changed, disable on_datetime
    // if on_datetime is changed, disable from_datetime and to_datetime
    const target = event.target;
    const id = target.id;
    const from_datetime_el = document.getElementById("from_date");
    const to_datetime_el = document.getElementById("to_date");
    const on_datetime_el = document.getElementById("on_date");
    if (id === "from_date" || id === "to_date") {
        on_datetime_el.disabled = true;
    }
    else if (id === "on_date") {
        from_datetime_el.disabled = true;
        to_datetime_el.disabled = true;
    }
    // if from_datetime and to_datetime are empty, enable on_datetime
    // if on_datetime is empty, enable from_datetime and to_datetime
    if (from_datetime_el.value === "" && to_datetime_el.value === "") {
        on_datetime_el.disabled = false;
    }
    else if (on_datetime_el.value === "") {
        from_datetime_el.disabled = false;
        to_datetime_el.disabled = false;
    }
}
function clearData() {
    // this function clears all data from the form on page load
    const from_datetime_el = document.getElementById("from_date");
    const to_datetime_el = document.getElementById("to_date");
    const on_datetime_el = document.getElementById("on_date");
    const is_red_el = document.getElementById("is_red");
    from_datetime_el.value = "";
    to_datetime_el.value = "";
    on_datetime_el.value = "";
    is_red_el.checked = false;
    from_datetime_el.disabled = false;
    to_datetime_el.disabled = false;
    on_datetime_el.disabled = false;
}
// create method for getting table entries by given parameters: from_datetime, to_datetime, on_datetime, is_red
// typical request looks like this http://192.168.132.103:8000/get_data?from_datetime=2021-01-01%2000:00:00
function getTableEntries(formVals, serverConf) {
    return __awaiter(this, void 0, void 0, function* () {
        // create URLSearchParams object
        const params = new URLSearchParams();
        console.log(formVals.from_date.toISOString());
        // add params to URLSearchParams object
        if (formVals.from_date.getFullYear() !== 1970)
            params.append("from_date", formVals.from_date.toISOString());
        if (formVals.to_date.getFullYear() !== 1970)
            params.append("to_date", formVals.to_date.toISOString());
        if (formVals.on_date.getFullYear() !== 1970)
            params.append("on_date", formVals.on_date.toISOString());
        params.append("is_red", formVals.is_red.toString());
        console.log(params.toString());
        // create response object
        const response = yield fetch(`${serverConf.url}:${serverConf.port}/get_data?${params}`);
        // create json object
        const json = yield response.json();
        // return json
        return json;
    });
}
