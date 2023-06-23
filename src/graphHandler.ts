import { Chart } from "chart.js/auto";

export class GraphHandler {
    public static displaySummaryGraph(data: { reds: number, greens: number }) {
        // create chart
        var ctx = document.getElementById('summaryChart') as HTMLCanvasElement;
        var summaryChart = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: ['Reds', 'Greens'],
                datasets: [{
                    label: 'Summary',
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

    public static displayRedsAndGreensByWeek(data: { week: string, reds: number, greens: number }[]) {
        // create chart
        var ctx = document.getElementById('otherChart') as HTMLCanvasElement;
        var redsAndGreensByWeekChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(x => x.week),
                datasets: [{
                    label: 'Reds',
                    data: data.map(x => x.reds),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Greens',
                    data: data.map(x => x.greens),
                    backgroundColor: 'rgba(0, 255, 0, 0.2)',
                    borderColor: 'rgba(0, 255, 0, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    public static displayRedsAndGreensByHour(data: { hour: string, reds: number, greens: number }[]) {
        // create chart
        var ctx = document.getElementById('otherChart') as HTMLCanvasElement;
        var redsAndGreensByHourChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(x => x.hour),
                datasets: [{
                    label: 'Reds',
                    data: data.map(x => x.reds),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Greens',
                    data: data.map(x => x.greens),
                    backgroundColor: 'rgba(0, 255, 0, 0.2)',
                    borderColor: 'rgba(0, 255, 0, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    public static displayRedsAndGreensByDay(data: { date: string, reds: number, greens: number }[]) {
        // create chart
        var ctx = document.getElementById('otherChart') as HTMLCanvasElement;
        var redsAndGreensByDayChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(x => x.date),
                datasets: [{
                    label: 'Reds',
                    data: data.map(x => x.reds),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Greens',
                    data: data.map(x => x.greens),
                    backgroundColor: 'rgba(0, 255, 0, 0.2)',
                    borderColor: 'rgba(0, 255, 0, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    public static displayRedsAndGreensByMonth(data: { month: string, reds: number, greens: number }[]) {
        // create chart
        var ctx = document.getElementById('otherChart') as HTMLCanvasElement;
        var redsAndGreensByMonthChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: data.map(x => x.month),
                datasets: [{
                    label: 'Reds',
                    data: data.map(x => x.reds),
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1
                },
                {
                    label: 'Greens',
                    data: data.map(x => x.greens),
                    backgroundColor: 'rgba(0, 255, 0, 0.2)',
                    borderColor: 'rgba(0, 255, 0, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }
}