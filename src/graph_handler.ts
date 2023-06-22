import Chart from "chart.js/auto";
import { tableRow } from "./types/databaseTypes";

export function createChart(data: tableRow[]) {
    // create chart
    var cvns = document.getElementById("chart") as HTMLCanvasElement;
    new Chart(cvns, {
        type: 'bar',
        data: {
            labels: data.map((row) => row.date_time),
            datasets: [{
                label: 'is_red',
                data: data.map((row) => row.is_red),
                backgroundColor: data.map((row) => row.is_red ? "red" : "blue"),
                borderColor: data.map((row) => row.is_red ? "red" : "blue"),
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {

                    beginAtZero: true
                }
            }
        }
    })
}