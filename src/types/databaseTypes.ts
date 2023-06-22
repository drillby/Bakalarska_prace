/**
 * Represents a row in a database table.
 */
export type tableRow = {
    id: string,
    date_time: Date,
    is_red: boolean,
}

/**
 * Represents the configuration for a database server.
 */
export type serverConfig = {
    url: string,
    port: number,
}