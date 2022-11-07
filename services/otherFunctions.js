const moment = require("moment");

function generateRoute(segments) {
    let route = "";
    for (let i = 0; i < segments.length; i++) {
        route += segments[i].departure.iataCode;
        route += " -> ";
    }
    route += segments.at(-1).arrival.iataCode;
    return route;
}

function parseTotalDuration(duration) {
    if (duration == null || duration == undefined) return "";

    let y = duration.substring(2, duration.length - 1);
    y = y.replace("H", ":");

    let ind = y.indexOf(":");

    let hr = y.substring(0, ind);
    let min = y.substring(ind + 1, y.length);

    if (hr < 10) {
        hr = `0${hr}`;
    }

    if (min < 10) {
        min = `0${min}`;
    }

    return `${hr}:${min}`;
}

function parseDates(st) {
    if (st == null || st == undefined) return "";

    var d = moment(st);
    return [d.format("hh:mm"), d.format("ddd, MMM D, YYYY")];
}

function prepareData(data) {
    let impData = [];
    let LIMIT = 20,
        i = 0;

    for (x of data) {
        let [dephour, depday] = parseDates(
            x.itineraries[0].segments[0].departure.at
        );
        let [arrhour, arrday] = parseDates(
            x.itineraries[0].segments.at(-1).arrival.at
        );

        impData.push({
            duration: parseTotalDuration(x.itineraries[0].duration),
            source: x.itineraries[0].segments[0].departure.iataCode,
            destination: x.itineraries[0].segments.at(-1).arrival.iataCode,
            route: generateRoute(x.itineraries[0].segments),
            departureDate: depday,
            departureTime: dephour,
            arrivalDate: arrday,
            arrivalTime: arrhour,
            price: x.price,
            numHops: x.itineraries[0].segments.length,
            numberOfBookableSeats: x.numberOfBookableSeats,
        });
        i++;

        if (i == 20) {
            break;
        }
    }
    return impData;
}

module.exports = { generateRoute, parseTotalDuration, parseDates, prepareData };
