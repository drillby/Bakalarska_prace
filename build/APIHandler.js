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
// create APIHandler class
class APIHandler {
    // create constructor
    constructor(url, port) {
        // create base url
        this.baseURL = url;
        this.port = port;
    }
    // create method for getting table entries by given parameters: from_datetime, to_datetime, on_datetime, is_red
    // typical request looks like this http://192.168.132.103:8000/get_data?from_datetime=2021-01-01%2000:00:00
    getTableEntries(from_datetime, to_datetime, on_datetime, is_red) {
        return __awaiter(this, void 0, void 0, function* () {
            // create URLSearchParams object
            const params = new URLSearchParams();
            // add params to URLSearchParams object
            params.append("from_datetime", from_datetime.toString());
            params.append("to_datetime", to_datetime.toString());
            params.append("on_datetime", on_datetime.toString());
            params.append("is_red", is_red.toString());
            // create response object
            const response = yield fetch(`${this.baseURL}:${this.port}/get_data?${params}`);
            // create json object
            const json = yield response.json();
            // return json
            return json;
        });
    }
}
