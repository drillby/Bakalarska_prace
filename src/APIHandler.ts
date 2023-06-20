import { tableRow } from "./types/databaseTypes";

// create APIHandler class
export class APIHandler {
    // create baseURL property
    private baseURL: string;
    private port: number;
    // create constructor
    constructor(url: string, port: number) {
        // create base url
        this.baseURL = url;
        this.port = port;
    }
    // create method for getting table entries by given parameters: from_datetime, to_datetime, on_datetime, is_red
    // typical request looks like this http://192.168.132.103:8000/get_data?from_datetime=2021-01-01%2000:00:00
    public async getTableEntries(from_datetime: Date, to_datetime: Date, on_datetime: Date, is_red: boolean): Promise<tableRow[]> {
        // create URLSearchParams object
        const params = new URLSearchParams();
        // add params to URLSearchParams object
        params.append("from_datetime", from_datetime.toString());
        params.append("to_datetime", to_datetime.toString());
        params.append("on_datetime", on_datetime.toString());
        params.append("is_red", is_red.toString());
        // create response object
        const response = await fetch(`${this.baseURL}:${this.port}/get_data?${params}`);
        // create json object
        const json: tableRow[] = await response.json();
        // return json
        return json;
    }

}