import { serverConfig, tableRow } from "./types/databaseTypes";
import { formValues } from "./types/formTypes";

/**
 * Retrieves table entries from the server based on the specified form data and server configuration.
 * @param formVals An object of type `formValues` containing the form data to use in the request.
 * @param serverConf An object of type `serverConfig` containing the server configuration to use in the request.
 * @returns A promise that resolves to an array of objects of type `tableRow` representing the retrieved table entries.
 */
export async function getTableEntries(formVals: formValues, serverConf: serverConfig): Promise<tableRow[]> {
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
    const response = await fetch(`http://${serverConf.url}:${serverConf.port}/get_data?${params}`);
    // create json object
    const json: tableRow[] = await response.json();
    // return json
    // @ts-ignore
    return json.data;
}


/**
 * Downloads table entries from the server based on the specified form data and server configuration.
 * @param formVals An object of type `formValues` containing the form data to use in the request.
 * @param serverConf An object of type `serverConfig` containing the server configuration to use in the request.
 * @returns Nothing.
 */
export async function downloadTableEntries(formVals: formValues, serverConf: serverConfig) {
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
        a.remove();
    })
}


/**
 * Sends a request to the server to generate the specified number of dummy data entries.
 * This function is used for testing purposes only.
 * @param numOfEntries The number of dummy data entries to generate.
 * @param serverConf An object of type `serverConfig` containing the server configuration to use in the request.
 * @returns Nothing.
 */
export function createDummyData(numOfEntries: number, serverConf: serverConfig) {
    fetch(`http://${serverConf.url}:${serverConf.port}/generate_dummy_data/${numOfEntries}`, { method: "POST" }).then(res => res.json()).then(json => {
    })
}