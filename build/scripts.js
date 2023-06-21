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
/**
 * Retrieves form data from the specified HTML form element and returns it as an object of type `formValues`.
 * @param id The ID of the HTML form element to retrieve data from.
 * @returns An object of type `formValues` containing the form data.
 */
function getFormData(id) {
    let form = document.getElementById(id);
    let formData = new FormData(form);
    let data = {
        from_date: new Date(formData.get("from_date")),
        to_date: new Date(formData.get("to_date")),
        on_date: new Date(formData.get("on_date")),
        color: formData.get("color"),
    };
    return data;
}
/**
 * Handles the form submission event. Retrieves form data and validates it before sending a request to the server to get table entries.
 * @param event The form submission event.
 * @returns Nothing.
 */
function handleSubmit(event) {
    event.preventDefault();
    const values = getFormData("form");
    // if all date fields are empty alert user
    if (values.from_date.toDateString() === "Invalid Date" && values.to_date.toDateString() === "Invalid Date" && values.on_date.toDateString() === "Invalid Date") {
        alert("Prosím vyplňte pole 'Od', 'Do', nebo 'Dne'");
        return;
    }
    // if from_datetime or to_datetime are empty alert user
    if ((values.from_date.toDateString() === "Invalid Date" || values.to_date.toDateString() === "Invalid Date") && values.on_date.toDateString() !== "Invalid Date") {
        alert("Prosím vyplňte pole 'Od' a 'Do'");
        return;
    }
    // if to_datetime is before from_datetime alert user
    if (values.from_date > values.to_date) {
        alert("Datum 'Od' musí být před datem 'Do'");
        return;
    }
    // retrieve table entries from server and display them
    getTableEntries(values, { url: "192.168.132.156", port: 8000 }).then((data) => {
        displayData(data);
    });
}
/**
 * Handles the change event for the date inputs. Disables the appropriate date inputs based on which one was changed.
 * @param event The change event.
 * @returns Nothing.
 */
function handleDateChange(event) {
    // if from_datetime or to_datetime is changed, disable on_datetime
    // if on_datetime is changed, disable from_datetime and to_datetime
    const target = event.target;
    const id = target.id;
    const from_datetime_el = document.getElementById("from_date");
    const to_datetime_el = document.getElementById("to_date");
    const on_datetime_el = document.getElementById("on_date");
    // if from_datetime or to_datetime are not empty, disenable on_datetime
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
/**
 * Clears all data from the form on page load.
 * @returns Nothing.
 */
function clearData() {
    const from_datetime_el = document.getElementById("from_date");
    const to_datetime_el = document.getElementById("to_date");
    const on_datetime_el = document.getElementById("on_date");
    const color = document.getElementById("color");
    from_datetime_el.value = "";
    to_datetime_el.value = "";
    on_datetime_el.value = "";
    color.selectedIndex = 0;
    from_datetime_el.disabled = false;
    to_datetime_el.disabled = false;
    on_datetime_el.disabled = false;
}
/**
 * Retrieves table entries from the server based on the specified form data and server configuration.
 * @param formVals An object of type `formValues` containing the form data to use in the request.
 * @param serverConf An object of type `serverConfig` containing the server configuration to use in the request.
 * @returns A promise that resolves to an array of objects of type `tableRow` representing the retrieved table entries.
 */
function getTableEntries(formVals, serverConf) {
    return __awaiter(this, void 0, void 0, function* () {
        // create URLSearchParams object
        const params = new URLSearchParams();
        // add params to URLSearchParams object
        // validate dates before adding them to params
        if (formVals.from_date.getFullYear() !== 1970)
            params.append("from_date", formVals.from_date.toISOString());
        if (formVals.to_date.getFullYear() !== 1970)
            params.append("to_date", formVals.to_date.toISOString());
        if (formVals.on_date.getFullYear() !== 1970)
            params.append("on_date", formVals.on_date.toISOString());
        params.append("color", formVals.color.toString());
        // create response object
        const response = yield fetch(`http://${serverConf.url}:${serverConf.port}/get_data?${params}`);
        // create json object
        const json = yield response.json();
        // return json
        // @ts-ignore
        return json.data;
    });
}
/**
 * Downloads table entries from the server based on the specified form data and server configuration.
 * @param formVals An object of type `formValues` containing the form data to use in the request.
 * @param serverConf An object of type `serverConfig` containing the server configuration to use in the request.
 * @returns Nothing.
 */
function downloadTableEntries(formVals, serverConf) {
    return __awaiter(this, void 0, void 0, function* () {
        // create URLSearchParams object
        const params = new URLSearchParams();
        // add params to URLSearchParams object
        if (formVals.from_date.getFullYear() !== 1970)
            params.append("from_date", formVals.from_date.toISOString());
        if (formVals.to_date.getFullYear() !== 1970)
            params.append("to_date", formVals.to_date.toISOString());
        if (formVals.on_date.getFullYear() !== 1970)
            params.append("on_date", formVals.on_date.toISOString());
        params.append("color", formVals.color.toString());
        // create response object
        fetch(`http://${serverConf.url}:${serverConf.port}/download_data?${params}`).then(res => res.blob()).then(blob => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = "data.csv";
            a.click();
            document.removeChild(a);
        });
    });
}
/**
 * Handles the click event for the download button. Retrieves form data and initiates a download of table entries from the server.
 * @returns Nothing.
 */
function handleDownloadBtn() {
    const values = getFormData("form");
    downloadTableEntries(values, { url: "192.168.132.156", port: 8000 });
}
/**
 * Displays the given table data in the HTML table element with ID "table_body".
 * @param data An array of objects of type `tableRow` representing the table data to display.
 * @returns Nothing.
 */
function displayData(data) {
    // create new tbody
    var newTbody = document.createElement('tbody');
    newTbody.classList.add("bg-white", "divide-y", "divide-gray-200");
    var oldTbody = document.getElementById("table_body");
    // create table rows and append them to the new tbody
    data.map((row) => {
        var newRow = document.createElement('tr');
        newRow.classList.add("bg-gray-100");
        var idTd = document.createElement('td');
        idTd.classList.add("px-6", "py-4", "whitespace-nowrap");
        idTd.textContent = row.id.toString();
        newRow.appendChild(idTd);
        var datetimeTd = document.createElement('td');
        datetimeTd.classList.add("px-6", "py-4", "whitespace-nowrap");
        datetimeTd.textContent = row.date_time.toString();
        newRow.appendChild(datetimeTd);
        var isRedTd = document.createElement('td');
        isRedTd.classList.add("px-6", "py-4", "whitespace-nowrap");
        isRedTd.textContent = row.is_red.toString();
        newRow.appendChild(isRedTd);
        newTbody.appendChild(newRow);
    });
    // replace old tbody with new tbody
    oldTbody === null || oldTbody === void 0 ? void 0 : oldTbody.replaceWith(newTbody);
}
/**
 * Sends a request to the server to generate the specified number of dummy data entries.
 * This function is used for testing purposes only.
 * @param numOfEntries The number of dummy data entries to generate.
 * @param serverConf An object of type `serverConfig` containing the server configuration to use in the request.
 * @returns Nothing.
 */
function createDummyData(numOfEntries, serverConf) {
    fetch(`http://${serverConf.url}:${serverConf.port}/generate_dummy_data/${numOfEntries}`, { method: "POST" }).then(res => res.json()).then(json => {
        console.log(json);
    });
}
