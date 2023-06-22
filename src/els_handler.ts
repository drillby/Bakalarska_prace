import { tableRow } from "./types/databaseTypes";
import { formValues } from "./types/formTypes";

/**
 * Retrieves form data from the specified HTML form element and returns it as an object of type `formValues`.
 * @param id The ID of the HTML form element to retrieve data from.
 * @returns An object of type `formValues` containing the form data.
 */
export function getFormData(id: string): formValues {
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

/**
 * Clears all data from the form on page load.
 * @returns Nothing.
 */
export function clearData(): void {
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

/**
 * Displays the given table data in the HTML table element with ID "table_body".
 * @param data An array of objects of type `tableRow` representing the table data to display.
 * @returns Nothing.
 */
export function displayData(data: tableRow[]) {
    // create new tbody
    var newTbody = document.createElement('tbody');
    newTbody.classList.add("bg-white", "divide-y", "divide-gray-200");
    var oldTbody = document.getElementById("table_body") as HTMLTableSectionElement


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

    })

    // replace old tbody with new tbody
    oldTbody.replaceWith(newTbody);
}

