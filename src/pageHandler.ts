import { formValues } from "./types/formTypes";

function getFormData(id: string): formValues {
    let form = document.getElementById(id) as HTMLFormElement;
    let formData = new FormData(form);
    let data: formValues = {
        from_date: new Date(formData.get("from_date") as string),
        to_date: new Date(formData.get("to_date") as string),
        on_date: new Date(formData.get("on_date") as string),
        is_red: formData.get("is_red") === "true" ? true : false,
    }
    return data;
}

function handleSubmit(event: Event) {
    event.preventDefault();
    const values = getFormData("form");
    console.log(values);
    // if all date fields are empty alert user
    if (values.from_date.toDateString() === new Date(0).toDateString() && values.to_date.toDateString() === new Date(0).toDateString() && values.on_date.toDateString() === new Date(0).toDateString()) {
        alert("Prosím vyplňte pole 'Od', 'Do' nebo 'Dne'");
        return;
    }


    // if from_datetime or to_datetime are empty alert user
    if ((values.from_date.toDateString() === new Date(0).toDateString() || values.to_date.toDateString() === new Date(0).toDateString()) && values.on_date.toDateString() !== new Date(0).toDateString()) {
        alert("Prosím vyplňte pole 'Od' a 'Do'");
        return;
    }

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