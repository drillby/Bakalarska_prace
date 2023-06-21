import { serverConfig, tableRow } from "./types/databaseTypes";
import { formValues } from "./types/formTypes";

function getFormData(id: string): formValues {
    let form = document.getElementById(id) as HTMLFormElement;
    let formData = new FormData(form);
    let data: formValues = {
        from_date: new Date(formData.get("from_date") as string),
        to_date: new Date(formData.get("to_date") as string),
        on_date: new Date(formData.get("on_date") as string),
        color: formData.get("color") as string,
    }
    return data;
}

function handleSubmit(event: Event) {
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

    getTableEntries(values, { url: "192.168.132.156", port: 8000 }).then((data) => {
        console.log(data);
    });
}

function handleDateChange(event: Event) {
    // if from_datetime or to_datetime is changed, disable on_datetime
    // if on_datetime is changed, disable from_datetime and to_datetime
    const target = event.target as HTMLInputElement;
    const id = target.id;
    const from_datetime_el = document.getElementById("from_date") as HTMLInputElement;
    const to_datetime_el = document.getElementById("to_date") as HTMLInputElement;
    const on_datetime_el = document.getElementById("on_date") as HTMLInputElement;

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
    const from_datetime_el = document.getElementById("from_date") as HTMLInputElement;
    const to_datetime_el = document.getElementById("to_date") as HTMLInputElement;
    const on_datetime_el = document.getElementById("on_date") as HTMLInputElement;
    const color = document.getElementById("color") as HTMLSelectElement;

    from_datetime_el.value = "";
    to_datetime_el.value = "";
    on_datetime_el.value = "";
    color.selectedIndex = 0;
    from_datetime_el.disabled = false;
    to_datetime_el.disabled = false;
    on_datetime_el.disabled = false;
}



// create method for getting table entries by given parameters: from_datetime, to_datetime, on_datetime, is_red
// typical request looks like this http://192.168.132.103:8000/get_data?from_datetime=2021-01-01%2000:00:00
async function getTableEntries(formVals: formValues, serverConf: serverConfig): Promise<tableRow[]> {
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

    console.log(params.toString());
    // create response object
    const response = await fetch(`http://${serverConf.url}:${serverConf.port}/get_data?${params}`);
    // create json object
    const json: tableRow[] = await response.json();
    // return json
    return json;
}


async function downloadTableEntries(formVals: formValues, serverConf: serverConfig) {
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

    console.log(params.toString());
    // create response object
    fetch(`http://${serverConf.url}:${serverConf.port}/download_data?${params}`).then(res => res.blob()).then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "data.csv";
        a.click();
        document.removeChild(a);
    })
}

function handleDownloadBtn() {
    const values = getFormData("form");
    downloadTableEntries(values, { url: "192.168.132.156", port: 8000 });
}