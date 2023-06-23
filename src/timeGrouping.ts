import { tableRow } from "./types/databaseTypes";

export function getRedsAndGreens(data: tableRow[]): { reds: number, greens: number } {
    // count how many reds and greens are there
    let reds = 0;
    let greens = 0;

    for (let i = 0; i < data.length; i++) {
        if (data[i].is_red) {
            reds++;
        } else {
            greens++;
        }
    }

    return { reds, greens };
}

export function getRedsAndGreensByDay(data: tableRow[]): { date: string, reds: number, greens: number }[] {
    // change date_time to date
    for (let i = 0; i < data.length; i++) {
        data[i].date_time = new Date(data[i].date_time).toLocaleDateString();
    }

    // count how many reds and greens on each day
    let reds = 0;
    let greens = 0;
    let redsAndGreensByDay: { date: string, reds: number, greens: number }[] = [];

    for (let i = 0; i < data.length; i++) {
        if (data[i].is_red) {
            reds++;
        } else {
            greens++;
        }

        if (i == data.length - 1 || data[i].date_time != data[i + 1].date_time) {
            // transform date_time to dd/mm/yyyy
            data[i].date_time = data[i].date_time.replace(/(\d+)\/(\d+)\/(\d+)/, function (match, p1, p2, p3) {
                return `${p2}/${p1}/${p3}`;
            });

            redsAndGreensByDay.push({ date: data[i].date_time, reds, greens });
            reds = 0;
            greens = 0;
        }
    }
    return redsAndGreensByDay;
}


export function getRedsandGreensByMonth(data: tableRow[]): { month: string, reds: number, greens: number }[] {
    var dataByDay = getRedsAndGreensByDay(data);

    // count how many reds and greens on each month
    let reds = 0;
    let greens = 0;
    let redsAndGreensByMonth: { month: string, reds: number, greens: number }[] = [];

    // months look-up table in czech
    let months = {
        "1": "Leden",
        "2": "Únor",
        "3": "Březen",
        "4": "Duben",
        "5": "Květen",
        "6": "Červen",
        "7": "Červenec",
        "8": "Srpen",
        "9": "Září",
        "10": "Říjen",
        "11": "Listopad",
        "12": "Prosinec",
    }


    for (let i = 0; i < dataByDay.length; i++) {
        reds += dataByDay[i].reds;
        greens += dataByDay[i].greens;

        if (i == dataByDay.length - 1 || dataByDay[i].date.split("/")[1] != dataByDay[i + 1].date.split("/")[1]) {
            var monthName = months[dataByDay[i].date.split("/")[1]];
            var year = dataByDay[i].date.split("/")[2];

            var idx = redsAndGreensByMonth.findIndex(x => x.month == `${monthName} ${year}`);

            if (idx != -1) {
                redsAndGreensByMonth[idx].reds += reds;
                redsAndGreensByMonth[idx].greens += greens;
            } else {
                redsAndGreensByMonth.push({ month: `${monthName} ${year}`, reds, greens });
            }
            reds = 0;
            greens = 0;
        }
    }

    // sort from oldest to newest
    redsAndGreensByMonth.sort(function (a, b) {
        var aDate = new Date(a.month.split(" ")[1], Object.keys(months).find(key => months[key] === a.month.split(" ")[0]) as unknown as number);
        var bDate = new Date(b.month.split(" ")[1], Object.keys(months).find(key => months[key] === b.month.split(" ")[0]) as unknown as number);
        return aDate.getTime() - bDate.getTime();
    });
    return redsAndGreensByMonth;
}

export function getRedsAndGreensByWeek(data: tableRow[]): { week: string, reds: number, greens: number }[] {
    var dataByDay = getRedsAndGreensByDay(data);

    // count how many reds and greens on each week
    let reds = 0;
    let greens = 0;

    let redsAndGreensByWeek: { week: string, reds: number, greens: number }[] = [];

    function getWeekNumber(date: string) {
        // format date to mm/dd/yyyy
        date = date.replace(/(\d+)\/(\d+)\/(\d+)/, function (match, p1, p2, p3) {
            return `${p2}/${p1}/${p3}`;
        });

        var date1 = new Date(date);
        var onejan = new Date(date1.getFullYear(), 0, 1);
        return Math.ceil((((date1.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);
    }

    for (let i = 0; i < dataByDay.length; i++) {
        reds += dataByDay[i].reds;
        greens += dataByDay[i].greens;
        // calculate week number
        var weekNumber = getWeekNumber(dataByDay[i].date);
        var year = dataByDay[i].date.split("/")[2];
        var week = `${weekNumber}. týden ${year}`;

        var idx = redsAndGreensByWeek.findIndex(x => x.week == week);

        if (idx != -1) {
            redsAndGreensByWeek[idx].reds += reds;
            redsAndGreensByWeek[idx].greens += greens;
        } else {
            redsAndGreensByWeek.push({ week, reds, greens });
        }
        reds = 0;
        greens = 0;
    }

    // sort by year and week number
    redsAndGreensByWeek.sort(function (a, b) {
        var aWeekNumber = parseInt(a.week.split(" ")[0].replace(".", ""));
        var bWeekNumber = parseInt(b.week.split(" ")[0].replace(".", ""));
        var aYear = parseInt(a.week.split(" ")[2]);
        var bYear = parseInt(b.week.split(" ")[2]);

        if (aYear == bYear) {
            return aWeekNumber - bWeekNumber;
        } else {
            return aYear - bYear;
        }
    });

    return redsAndGreensByWeek;
}

export function getRedsAndGreensByHour(data: tableRow[]): { hour: string, reds: number, greens: number }[] {
    // count how many reds and greens on each hour
    let reds = 0;
    let greens = 0;
    let redsAndGreensByHour: { hour: string, reds: number, greens: number }[] = [];

    for (let i = 0; i < data.length; i++) {
        reds += data[i].is_red ? 1 : 0;
        greens += data[i].is_red ? 0 : 1;

        var hour = data[i].date_time.split(" ")[4].split(":")[0];
        var idx = redsAndGreensByHour.findIndex(x => x.hour == hour);

        if (idx != -1) {
            redsAndGreensByHour[idx].reds += reds;
            redsAndGreensByHour[idx].greens += greens;
        }
        else {
            redsAndGreensByHour.push({ hour, reds, greens });
        }
        reds = 0;
        greens = 0;

    }
    return redsAndGreensByHour;
}