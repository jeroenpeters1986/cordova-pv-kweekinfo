/**
 * Extend the Date object
 */

Date.prototype.addDays = function(days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() + days);
    return dat;
}

Date.prototype.subtractDays = function(days) {
    var dat = new Date(this.valueOf());
    dat.setDate(dat.getDate() - days);
    return dat;
}

Date.prototype.toNLString = function(short) {
    if(short == true)
    {
        var monthNames = ["Jan", "Feb", "Mrt", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dec"];
    } else {
        var monthNames = ["Januari", "Februari", "Maart", "April", "Mei", "Juni",
            "Juli", "Augustus", "September", "Oktober", "November", "December"];
    }

    return [("0" + this.getDate()).slice(-2), monthNames[this.getMonth()], this.getFullYear()].join(' ');
}

/**
 * Return a list of dates between a start and stopdate
 * @param startDate
 * @param endDate
 * @returns {Array}
 */
function getDates(startDate, endDate)
{
    var dateArray = new Array();
    var currentDate = startDate;
    while (currentDate <= endDate)
    {
        dateArray.push(currentDate)
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

/**
 * Get difference in days between two dates
 * @param startDate
 * @param endDate
 * @returns {number}
 */
function getDifferenceInDays(startDate, endDate) {
    return Math.round((startDate-endDate)/(1000*60*60*24));
}