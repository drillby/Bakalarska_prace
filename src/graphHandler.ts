import { Chart } from "chart.js/auto";

/**
 * A class that handles the creation and display of graphs.
 */
export class GraphHandler {
    /**
     * Displays a summary pie graph of the given data.
     * @param data An object containing the number of red and green items.
     */
    public static displaySummaryGraph(data: { reds: number, greens: number }) {
        // create chart
        var ctx = document.getElementById('summaryChart') as HTMLCanvasElement;
        var summaryChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Červená', 'Zelená'],
                datasets: [{
                    label: 'Souhrm',
                    data: [data.reds, data.greens],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(0, 255, 0, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(0, 255, 0, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    /**
     * Displays a bar graph of the number of red and green items for each week in the given data.
     * @param data An array of objects containing the week number and the number of red and green items.
     */
    public static displayRedsAndGreensByWeek(data: { week: string, reds: number, greens: number }[]) {
        // create chart
        var ctx = document.getElementById('otherChart') as HTMLCanvasElement;
        var redsAndGreensByWeekChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(x => x.week),
                datasets: [{
                    label: 'Červená',
                    data: data.map(x => x.reds),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Zelená',
                    data: data.map(x => x.greens),
                    backgroundColor: 'rgba(0, 255, 0, 0.2)',
                    borderColor: 'rgba(0, 255, 0, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    /**
     * Displays a bar graph of the number of red and green items for each hour in the given data.
     * @param data An array of objects containing the hour and the number of red and green items.
     */
    public static displayRedsAndGreensByHour(data: { hour: string, reds: number, greens: number }[]) {
        // create chart
        var ctx = document.getElementById('otherChart') as HTMLCanvasElement;
        var redsAndGreensByHourChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(x => {
                    if (x.hour == "1") {
                        x.hour += " hodina";
                    }
                    else if (x.hour == "2" || x.hour == "3" || x.hour == "4") {
                        x.hour += " hodiny";
                    }
                    else {
                        x.hour += " hodin";
                    }
                    return x.hour;
                }),
                datasets: [{
                    label: 'Červená',
                    data: data.map(x => x.reds),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Zelená',
                    data: data.map(x => x.greens),
                    backgroundColor: 'rgba(0, 255, 0, 0.2)',
                    borderColor: 'rgba(0, 255, 0, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    /**
     * Displays a bar graph of the number of red and green items for each day in the given data.
     * @param data An array of objects containing the date and the number of red and green items.
     */
    public static displayRedsAndGreensByDay(data: { date: string, reds: number, greens: number }[]) {
        // create chart
        var ctx = document.getElementById('otherChart') as HTMLCanvasElement;
        var redsAndGreensByDayChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(x => x.date),
                datasets: [{
                    label: 'Červená',
                    data: data.map(x => x.reds),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Zelená',
                    data: data.map(x => x.greens),
                    backgroundColor: 'rgba(0, 255, 0, 0.2)',
                    borderColor: 'rgba(0, 255, 0, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }

    /**
     * Displays a bar graph of the number of red and green items for each month in the given data.
     * @param data An array of objects containing the month and the number of red and green items.
     */
    public static displayRedsAndGreensByMonth(data: { month: string, reds: number, greens: number }[]) {
        // create chart
        var ctx = document.getElementById('otherChart') as HTMLCanvasElement;
        var redsAndGreensByMonthChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(x => x.month),
                datasets: [{
                    label: 'Červená',
                    data: data.map(x => x.reds),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Zelená',
                    data: data.map(x => x.greens),
                    backgroundColor: 'rgba(0, 255, 0, 0.2)',
                    borderColor: 'rgba(0, 255, 0, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        ticks: {
                            stepSize: 1
                        }
                    }
                }
            }
        });
    }
}