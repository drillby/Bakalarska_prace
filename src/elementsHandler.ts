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
    data = [...data]
    // create new tbody
    var newTbody = document.createElement('tbody');
    newTbody.classList.add("bg-white", "divide-y", "divide-gray-200");
    newTbody.id = "table_body";
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
        var date = new Date(row.date_time).toLocaleString();
        // subtract 2 hours from date to account for timezone difference
        date = new Date(new Date(date).getTime() - 2 * 60 * 60 * 1000).toLocaleString();
        // transform to 24-hour format
        date = date.replace(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+):(\d+) (AM|PM)/, function (match, p1, p2, p3, p4, p5, p6, p7) {
            if (p7 == "PM" && parseInt(p4) < 12) {
                // return date and time in 24-hour format
                return `${p1}/${p2}/${p3}, ${parseInt(p4) + 12}:${p5}:${p6}`;
            }
            else {
                return `${p1}/${p2}/${p3}, ${p4}:${p5}:${p6}`;
            }
        });

        // transform to dd/mm/yyyy format
        date = date.replace(/(\d+)\/(\d+)\/(\d+), (\d+):(\d+):(\d+)/, function (match, p1, p2, p3, p4, p5, p6) {
            return `${p2}/${p1}/${p3}, ${p4}:${p5}:${p6}`;
        });

        datetimeTd.textContent = date;
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

