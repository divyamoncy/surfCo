export function dateConverter(date: string) {
    let months = [
        {
            "abbreviation": "Jan",
            "name": "January"
        },
        {
            "abbreviation": "Feb",
            "name": "February"
        },
        {
            "abbreviation": "Mar",
            "name": "March"
        },
        {
            "abbreviation": "Apr",
            "name": "April"
        },
        {
            "abbreviation": "May",
            "name": "May"
        },
        {
            "abbreviation": "Jun",
            "name": "June"
        },
        {
            "abbreviation": "Jul",
            "name": "July"
        },
        {
            "abbreviation": "Aug",
            "name": "August"
        },
        {
            "abbreviation": "Sep",
            "name": "September"
        },
        {
            "abbreviation": "Oct",
            "name": "October"
        },
        {
            "abbreviation": "Nov",
            "name": "November"
        },
        {
            "abbreviation": "Dec",
            "name": "December"
        }
    ];
    let [month, day, year] = date.split('/').map((x) => parseInt(x));
    year = (59 < year && year <= 99) ? year + 1900 : year + 2000;
    return [day, months[month - 1].name, year].join(" ");
};

export function getFormattedNumber(num: number) {
    return new Intl.NumberFormat("en", {notation: "compact"}).format(num);
}