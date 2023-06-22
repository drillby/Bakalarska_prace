import { downloadTableEntries, getTableEntries } from "./db_handler";
import { clearData, displayData, getFormData } from "./els_handler";
import { createChart } from "./graph_handler";

// window.addEventListener("load", () => {
//   clearData();
// });

const form = document.getElementById("form") as HTMLFormElement;
form.addEventListener("submit", e => {
  handleSubmit(e);
});

const from_datetime_el = document.getElementById("from_date") as HTMLInputElement;
const to_datetime_el = document.getElementById("to_date") as HTMLInputElement;
const on_datetime_el = document.getElementById("on_date") as HTMLInputElement;

from_datetime_el.addEventListener("change", e => {
  handleDateChange(e);
});

to_datetime_el.addEventListener("change", e => {
  handleDateChange(e);
});

on_datetime_el.addEventListener("change", e => {
  handleDateChange(e);
});

const download_button = document.getElementById("download_btn") as HTMLButtonElement;
download_button.addEventListener("click", e => {
  handleDownloadBtn();
});

/**
 * Handles the form submission event. Retrieves form data and validates it before sending a request to the server to get table entries.
 * @param event The form submission event.
 * @returns Nothing.
 */
function handleSubmit(event: Event): void {
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
    displayData(data)
    createChart(data)
  })

}

/**
 * Handles the change event for the date inputs. Disables the appropriate date inputs based on which one was changed.
 * @param event The change event.
 * @returns Nothing.
 */
function handleDateChange(event: Event) {
  // if from_datetime or to_datetime is changed, disable on_datetime
  // if on_datetime is changed, disable from_datetime and to_datetime
  const target = event.target as HTMLInputElement;
  const id = target.id;
  const from_datetime_el = document.getElementById("from_date") as HTMLInputElement;
  const to_datetime_el = document.getElementById("to_date") as HTMLInputElement;
  const on_datetime_el = document.getElementById("on_date") as HTMLInputElement;

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
 * Handles the click event for the download button. Retrieves form data and initiates a download of table entries from the server.
 * @returns Nothing.
 */
function handleDownloadBtn(): void {
  const values = getFormData("form");
  downloadTableEntries(values, { url: "192.168.132.156", port: 8000 });
}

