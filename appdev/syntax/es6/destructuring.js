/**
 * Created by charlesweng on 1/8/18.
 */
var [ start, end ] = ['earth', 'moon'];
console.log(start + ' calling ' + end);

[start, end] = [end, start];
console.log(start + ' calling ' + end);

function equinox() {
    return [ 20, 'March', 2013, 11, 2];
}

const [date, month,,,] = equinox();
console.log("This year's equinox was on " + date + 'th of ' + month);
console.log();

function equinox2() {
    return {
        date: 20,
        month: 'March',
        year: 2013,
        time: {
            hour: 11,
            minute: 2
        }
    };
}

const { date: d, month: m, time : { hour: h}} = equinox2();
console.log("This year's equinox was on " + d + 'th of ' + m + " at " + h);
console.log();