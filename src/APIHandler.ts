import { serverConfig, tableRow } from "./types/databaseTypes";
import { formValues } from "./types/formTypes";


// create method for getting table entries by given parameters: from_datetime, to_datetime, on_datetime, is_red
// typical request looks like this http://192.168.132.103:8000/get_data?from_datetime=2021-01-01%2000:00:00
async function getTableEntries(formVals: formValues, serverConf: serverConfig): Promise<tableRow[]> {
    // create URLSearchParams object
    const params = new URLSearchParams();
    // add params to URLSearchParams object
    params.append("from_datetime", formVals.from_date.toString());
    params.append("to_datetime", formVals.to_date.toString());
    params.append("on_datetime", formVals.on_date.toString());
    params.append("is_red", formVals.is_red.toString());
    // create response object
    const response = await fetch(`${serverConf.url}:${serverConf.port}/get_data?${params}`);
    // create json object
    const json: tableRow[] = await response.json();
    // return json
    return json;
}